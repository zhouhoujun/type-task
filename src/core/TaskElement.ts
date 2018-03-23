import { TaskComponent } from './TaskComponent';
import { ITask } from './ITask';
import { RunWay } from './RunWay';
import { ITaskComponent } from './ITaskComponent';
import { Task } from './decorators/index';
import { Observable } from 'rxjs/Observable';

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
    constructor(name: string, runWay = RunWay.seqFirst) {
        super(name, runWay);
    }

    execute(data: any): Observable<any> | Promise<any> {
        return Observable.of(data);
    }
}
