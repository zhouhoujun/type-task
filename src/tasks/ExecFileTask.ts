
import { RunWay } from '../RunWay';
import { ExecOptions, ExecFileOptions } from 'child_process';
import { ITask } from '../ITask';
import { AsyncTaskSource, AsyncSrc } from '../types';
import { ITaskContext } from '../ITaskContext';
import { Task } from '../core';
import { isString, isArray } from 'util';
import { ShellHelper } from './ShellHelper';


/**
 * exec file Task
 *
 * @class ExecFileTask
 * @implements {ITask}
 */
@Task
export class ExecFileTask implements ITask {
    constructor(private helper: ShellHelper) {

    }

    execute(ctx: ITaskContext): Promise<any> {
        let option = ctx.option as IExecFileOption;
        let files = ctx.to<AsyncSrc>(this.files);
        return Promise.resolve(files)
            .then(files => {
                if (isString(files)) {
                    return ctx.execFile(files, option.args, option.execFileOptions, option.allowError !== false);
                } else if (isArray(files)) {
                    if (option.fileRunWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        _.each(files, file => {
                            pip = pip.then(() => ctx.execFile(file, option.args, option.execFileOptions, option.allowError !== false));
                        });
                        return pip;
                    } else {
                        return Promise.all(_.map(files, file => ctx.execFile(file, option.args, option.execFileOptions, option.allowError !== false)));
                    }
                } else {
                    return Promise.reject('exec file task config error');
                }
            });
    }

}
