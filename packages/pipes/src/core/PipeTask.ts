import { Task, RunWay } from '@taskp/core';
import { PipeComponent } from './PipeComponent';
import { IPipeComponent, IPipeTask } from '.';

/**
 * task element.
 *
 * @export
 * @abstract
 * @class PipeTask
 * @extends {TaskComponent<ITaskComponent>}
 * @implements {ITask}
 */
@Task
export class PipeTask extends PipeComponent<IPipeComponent> implements IPipeTask<any> {
    constructor(name: string, runWay = RunWay.seqFirst) {
        super(name, runWay);
    }

    protected pipe(data: any): Promise<any> {
        return Promise.resolve(data);
    }
}
