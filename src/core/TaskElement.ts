import { TaskComponent } from './TaskComponent';
import { ITask } from './ITask';
import { RunWay } from './RunWay';
import { ITaskComponent } from './ITaskComponent';
import { Task } from './decorators/index';


/**
 * task element.
 *
 * @export
 * @abstract
 * @class TaskElement
 * @extends {TaskComponent<ITaskComponent>}
 * @implements {ITask}
 */
@Task('element')
export class TaskElement extends TaskComponent<ITaskComponent> implements ITask {
    constructor(name: string, runWay = RunWay.seqFirst) {
        super(name, runWay);
    }

    protected execute(data: any): Promise<any> {
        return Promise.resolve(data);
    }
}
