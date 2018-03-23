import { ComponentLifecycle } from 'tsioc';
import { ITaskContext } from '../ITaskContext';
import { Observable } from 'rxjs/Observable'


/**
 * task interface.
 *
 * @export
 * @interface ITask
 */
export interface ITask extends ComponentLifecycle {

    /**
     * task name.
     *
     * @type {string}
     * @memberof ITask
     */
    name: string;

    /**
     * task context.
     *
     * @type {ITaskContext}
     * @memberof ITask
     */
    context: ITaskContext;

    /**
     * run task.
     *
     * @param {*} [data]
     * @returns {(Observable<any> | Promise<any>)}
     * @memberof ITask
     */
    run(data?: any): Observable<any> | Promise<any>;

}

