import { Abstract, Inject } from 'tsioc';
import { ITask } from './ITask';
import { ITaskContext } from '../ITaskContext';
import { taskSymbols } from '../utils/index';
import { Observable} from 'rxjs/Observable';
/**
 * abstract task.
 *
 * @export
 * @abstract
 * @class AbstractTask
 * @implements {ITask}
 */
@Abstract()
export abstract class AbstractTask implements ITask {

    /**
     * task environment.
     *
     * @type {ITaskContext}
     * @memberof AbstractTask
     */
    @Inject(taskSymbols.ITaskContext)
    context: ITaskContext;

    constructor(public name: string) {

    }

    /**
     * run task.
     *
     * @abstract
     * @param {*} [data]
     * @returns {(Observable<any> | Promise<any>)}
     * @memberof AbstractTask
     */
    abstract run(data?: any): Observable<any> | Promise<any>;
}
