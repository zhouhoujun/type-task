import { ExecOptions, exec } from 'child_process';
import { isString, isBoolean, isArray, lang, ObjectMap, Inject } from '@ts-ioc/core';
import { Src, ActivityConfigure, CtxType, OnActivityInit, Activity, Task } from '@taskfr/core';
import { INodeContext, NodeContextToken } from '../core';

/**
 * shell activity config.
 *
 * @export
 * @interface ShellActivityConfig
 * @extends {ActivityConfigure}
 */
export interface ShellActivityConfig extends ActivityConfigure {
    /**
     * shell cmd
     *
     * @type {CtxType<Src>}
     * @memberof ShellActivityConfig
     */
    shell: CtxType<Src>;
    /**
     * shell args.
     *
     * @type {CtxType<string[] | ObjectMap<string | boolean>>}
     * @memberof ShellActivityConfig
     */
    args?: CtxType<string[] | ObjectMap<string | boolean>>;
    /**
     * shell exec options.
     *
     * @type {CtxType<ExecOptions>}
     * @memberof ShellActivityConfig
     */
    options?: CtxType<ExecOptions>;
    /**
     * allow error or not.
     *
     * @type {CtxType<boolean>}
     * @memberof ShellActivityConfig
     */
    allowError: CtxType<boolean>;
}


/**
 * Shell Task
 *
 * @class ShellActivity
 * @implements {ITask}
 */
@Task('shell')
export class ShellActivity extends Activity<any> implements OnActivityInit {
    /**
     * shell cmd.
     *
     * @type {Src}
     * @memberof ShellActivity
     */
    shell: Src;
    /**
     * shell args.
     *
     * @type {string[]}
     * @memberof ShellActivity
     */
    args: string[];
    /**
     * shell exec options.
     *
     * @type {ExecOptions}
     * @memberof ShellActivity
     */
    options: ExecOptions;
    /**
     * allow error or not.
     *
     * @memberof ShellActivity
     */
    allowError: boolean;

    @Inject(NodeContextToken)
    context: INodeContext;

    async onActivityInit(config: ShellActivityConfig) {
        await super.onActivityInit(config);
        this.shell = this.context.to(config.shell);
        let args = this.context.to(config.args);
        this.args = isArray(args) ? args : this.formatArgs(args);
        this.options = this.context.to(config.options);
        this.allowError = this.context.to(config.allowError);
        if (!isBoolean(this.allowError)) {
            this.allowError = true;
        }
    }

    protected execute(): Promise<any> {
        return Promise.resolve(this.shell)
            .then(cmds => {
                let allowError = this.allowError;
                let options = this.options;
                if (isString(cmds)) {
                    return this.execShell(cmds, options, allowError !== false);
                } else if (isArray(cmds)) {
                    let pip = Promise.resolve();
                    cmds.forEach(cmd => {
                        pip = pip.then(() => this.execShell(cmd, options));
                    });
                    return pip;
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
