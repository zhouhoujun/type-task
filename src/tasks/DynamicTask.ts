import { IAssertOption } from '../IAssertOption';
import { RunWay } from '../RunWay';
import { ExecOptions } from 'child_process';
import { ITask, ITaskInfo } from '../ITask';
import { AsyncTaskSource, AsyncSrc } from '../types';
import { ITaskContext } from '../ITaskContext';
import { IDynamicTaskOption } from '../IDynamicTaskOption';

/**
 * custom dynamic task.
 *
 * @class DynamicTask
 * @implements {ITask}
 */
export class DynamicTask implements ITask {
    constructor(protected info: ITaskInfo, protected dtp: IDynamicTaskOption) {
    }

    /**
     * get task info.
     *
     * @type {ITaskInfo}
     * @memberOf PipeTask
     */
    public getInfo(): ITaskInfo {
        return this.info;
    }

    execute(ctx: ITaskContext): Promise<any> {
        let rt = this.dtp.task(ctx, this.dtp);
        if (rt && rt['then']) {
            return rt as Promise<any>;
        } else {
            return Promise.resolve(rt);
        }
    }

}
