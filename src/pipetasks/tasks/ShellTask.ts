import { RunWay } from '../RunWay';
import { ExecOptions } from 'child_process';
import { ITask } from '../ITask';
import { AsyncTaskSource, AsyncSrc } from '../types';
import { ITaskContext } from '../ITaskContext';
import { Task } from '../core';
import { isString, isArray } from 'util';
import { ShellHelper } from './ShellHelper';


/**
 * Shell Task
 *
 * @class ShellTask
 * @implements {ITask}
 */
@Task
export class ShellTask implements ITask {
    constructor(private helper: ShellHelper, private coommand: string | string[], private options?: ExecOptions , private runWay?: RunWay) {

    }

    execute(ctx: ITaskContext): Promise<any> {
        return Promise.resolve(this.coommand)
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
