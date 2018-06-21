import { ExecOptions, exec } from 'child_process';
import { isString, isArray } from '@ts-ioc/core';
import { Task, AbstractTask, RunWay, Src, IConfigure, CtxType, OnTaskInit } from '@taskfr/core';
import { isBoolean } from 'util';
import { AbstractPipe } from '../core';
import { PipeTask } from '../decorators';

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
    cmd: CtxType<Src>;
    /**
     * shell args.
     *
     * @type {CtxType<string[]>}
     * @memberof ShellTaskConfig
     */
    args?: CtxType<string[]>;
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
@PipeTask('shell')
export class ExecShellTask extends AbstractPipe implements OnTaskInit {
    /**
     * cmd.
     *
     * @type {Src}
     * @memberof ExecShellTask
     */
    cmd: Src;
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

    constructor(name?: string) {
        super(name);
    }

    onTaskInit(config: ShellTaskConfig) {
        this.cmd = this.context.to(config.cmd);
        this.args = this.context.to(config.args);
        this.options = this.context.to(config.options);
        this.allowError = this.context.to(config.allowError);
        if (!isBoolean(this.allowError)) {
            this.allowError = true;
        }
    }

    run(): Promise<any> {
        return Promise.resolve(this.cmd)
            .then(cmds => {
                let allowError = this.allowError;
                let options = this.options;
                if (isString(cmds)) {
                    return this.execShell(cmds, options, allowError !== false);
                } else if (isArray(cmds)) {
                    if (this.runWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        cmds.forEach(cmd => {
                            pip = pip.then(() => this.execShell(cmd, options));
                        });
                        return pip;
                    } else {
                        return Promise.all(cmds.map(cmd => this.execShell(cmd, options, allowError !== false)));
                    }
                } else {
                    return Promise.reject('shell task config error');
                }
            });
    }

    protected execShell(cmd: string, options?: ExecOptions, allowError = true): Promise<any> {
        if (!cmd) {
            return Promise.resolve();
        }
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
                console.log(err);
                if (!allowError) {
                    reject(err);
                }
            });

            shell.on('exit', (code) => {
                console.log(`exit child process with code：${code}`);
                if (code > 0) {
                    reject(code);
                }
            });
        });
    }
}
