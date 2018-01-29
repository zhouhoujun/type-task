import { TaskContext } from './TaskContext';
import { ComponentLifecycle } from 'tsioc';



/**
 * task interface.
 *
 * @export
 * @interface ITask
 */
export interface ITask extends ComponentLifecycle {

    /**
     * get run context.
     *
     * @returns {TaskContext}
     * @memberof ITask
     */
    getContext(): TaskContext;

    /**
     * run task.
     *
     * @returns {Promise<any>}
     * @memberof ITask
     */
    run(): Promise<any>;

}

