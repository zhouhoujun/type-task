import { ComponentLifecycle } from 'tsioc';
import { ITaskContext } from '../ITaskContext';
import { IConfigure } from './IConfigure';



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
     * context
     *
     * @type {IConfigure}
     * @memberof ITaskModule
     */
    config?: IConfigure;

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
     * @returns {Promise<any>}
     * @memberof ITask
     */
    run(data?: any): Promise<any>;

}

