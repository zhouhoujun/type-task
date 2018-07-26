import { ExecOptions, exec } from 'child_process';
import { isString, isBoolean, isArray, lang, ObjectMap, Inject } from '@ts-ioc/core';
import { Src, IConfigure, CtxType, OnActivityInit, Activity, Task } from '@taskfr/core';
import { IPipeContext, PipeContextToken } from '../core';

/**
 * shell task config.
 *
 * @export
 * @interface ShellTaskConfig
 * @extends {IConfigure}
 */
export interface ShellTaskConfig extends IConfigure {
    /**
     * shell cmd
     *
     * @type {CtxType<Src>}
     * @memberof ShellTaskConfig
     */
    shell: CtxType<Src>;
    /**
     * shell args.
     *
     * @type {CtxType<string[] | ObjectMap<string | boolean>>}
     * @memberof ShellTaskConfig
     */
    args?: CtxType<string[] | ObjectMap<string | boolean>>;
    /**
     * shell exec options.
     *
     * @type {CtxType<ExecOptions>}
     * @memberof ShellTaskConfig
     */
    options?: CtxType<ExecOptions>;
    /**
     * allow error or not.
     *
     * @type {CtxType<boolean>}
     * @memberof ShellTaskConfig
     */
    allowError: CtxType<boolean>;
}


/**
 * Shell Task
 *
 * @class ShellTask
 * @implements {ITask}
 */
@Task('shell')
export class ExecShellTask extends Activity<any> implements OnActivityInit {
    /**
     * shell cmd.
     *
     * @type {Src}
     * @memberof ExecShellTask
     */
    shell: Src;
    /**
     * shell args.
     *
     * @type {string[]}
     * @memberof ExecShellTask
     */
    args: string[];
    /**
     * shell exec options.
     *
     * @type {ExecOptions}
     * @memberof ExecShellTask
     */
    options: ExecOptions;
    /**
     * allow error or not.
     *
     * @memberof ExecShellTask
     */
    allowError: boolean;

    @Inject(PipeContextToken)
    context: IPipeContext;

    activityInit(config: ShellTaskConfig) {
        this.shell = this.context.to(config.shell);
        let args = this.context.to(config.args);
        this.args = isArray(args) ? args : this.formatArgs(args);
        this.options = this.context.to(config.options);
        this.allowError = this.context.to(config.allowError);
        if (!isBoolean(this.allowError)) {
            this.allowError = true;
        }
    }

    run(): Promise<any> {
        return Promise.resolve(this.shell)
            .then(cmds => {
                let allowError = this.allowError;
                let options = this.options;
                if (isString(cmds)) {
                    return this.execShell(cmds, options, allowError !== false);
                } else if (isArray(cmds)) {
                    // if (this.runWay & RunWay.sequence) {
                        let pip = Promise.resolve();
                        cmds.forEach(cmd => {
                            pip = pip.then(() => this.execShell(cmd, options));
                        });
                        return pip;
                    // } else {
                    //     return Promise.all(cmds.map(cmd => this.execShell(cmd, options, allowError !== false)));
                    // }
                } else {
                    return Promise.reject('shell task config error');
                }
            });
    }

    protected formatShell(shell: string): string {
        if (this.args && this.args.length) {
            return shell + ' ' + this.args.join(' ');
        }
        return shell;
    }

    protected formatArgs(env: ObjectMap<string | boolean>): string[] {
        let args = [];
        lang.forIn(env, (val, k: string) => {
            if (k === 'root' || !/^[a-zA-Z]/.test(k)) {
                return;
            }
            if (isBoolean(val)) {
                if (val) {
                    args.push(`--${k}`);
                }
            } else if (val) {
                args.push(`--${k} ${val}`);
            }
        });
        return args;
    }

    protected execShell(cmd: string, options?: ExecOptions, allowError = true): Promise<any> {
        if (!cmd) {
            return Promise.resolve();
        }
        cmd = this.formatShell(cmd);
        return new Promise((resolve, reject) => {
            let shell = exec(cmd, options, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stdout);
                }
            });

            shell.stdout.on('data', data => {
                console.log(data);
            });

            shell.stderr.on('data', err => {
                console.error(err);
                if (!allowError) {
                    reject(err);
                }
            });

            shell.on('exit', (code) => {
                let msg = `exit child process with code：${code}`;
                console.log(msg);
                if (code > 0) {
                    reject(new Error(msg));
                }
            });
        });
    }
}
