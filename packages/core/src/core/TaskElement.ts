import { TaskComponent } from './TaskComponent';
import { ITask } from './ITask';
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
@Task
export class TaskElement extends TaskComponent<ITaskComponent> implements ITask {
    constructor(name?: string) {
        super(name);
    }

    protected execute(data: any): Promise<any> {
        return Promise.resolve(data);
    }
}
