import { RunWay } from '../RunWay';
import { ExecOptions } from 'child_process';
import { ITask } from '../ITask';
import { AsyncTaskSource, AsyncSrc } from '../types';
import { ITaskContext } from '../ITaskContext';
import { Task } from '../core';
import { isString, isArray } from 'util';
import { ShellHelper } from './ShellHelper';



/**
 * shell option.
 *
 * @export
 * @interface IShellOption
 * @extends {IAssertOption}
 */
export interface IShellOption extends IAssertOption {
    /**
     * the shell command run way. default parallel.
     *
     * @type {RunWay}
     * @memberof IShellOption
     */
    shellRunWay?: RunWay;

    /**
     * exec options.
     *
     * @type {ExecOptions}
     * @memberof IShellOption
     */
    execOptions?: ExecOptions;

    /**
     * all child process has error.
     */
    allowError?: boolean;

}

/**
 * Shell Task
 *
 * @class ShellTask
 * @implements {ITask}
 */
@Task
export class ShellTask implements ITask {
    constructor(private helper: ShellHelper) {

    }

    execute(ctx: ITaskContext): Promise<any> {
        let option = ctx.option as IShellOption;
        let cmd = ctx.to<AsyncSrc>(this.cmd);
        return Promise.resolve(cmd)
            .then(cmds => {
                if (isString(cmds)) {
                    return this.helper.execShell(cmds, option.execOptions, option.allowError !== false);
                } else if (isArray(cmds)) {
                    if (option.shellRunWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        cmds.forEach(cmd => {
                            pip = pip.then(() => this.helper.execShell(cmd, option.execOptions));
                        });
                        return pip;
                    } else {
                        return Promise.all(cmds.map(cmd => this.helper.execShell(cmd, option.execOptions, option.allowError !== false)));
                    }
                } else {
                    return Promise.reject('shell task config error');
                }
            });
    }
}
