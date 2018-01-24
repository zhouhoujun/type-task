import { TaskContext } from './TaskContext';



/**
 * task interface.
 *
 * @export
 * @interface ITask
 */
export interface ITask {

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

