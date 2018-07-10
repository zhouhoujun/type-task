import { TaskComponent } from './TaskComponent';
import { IActivity } from './IActivity';
import { ITaskComponent } from './ITaskComponent';
import { Task } from './decorators';


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
export class TaskElement extends TaskComponent<ITaskComponent> implements IActivity {
    constructor(name?: string) {
        super(name);
    }

    protected execute(data: any): Promise<any> {
        return Promise.resolve(data);
    }
}
