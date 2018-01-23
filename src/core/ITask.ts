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
     * @param {TaskContext} context
     * @returns {Promise<any>}
     * @memberof ITask
     */
    run(taskname?: string): Promise<any>;

}

