import { ComponentLifecycle, InjectToken } from '@ts-ioc/core';
import { RunWay } from './RunWay';
import { IContext } from './IContext';

/**
 * task token.
 */
export const TaskToken = new InjectToken<ITask>('__TASK_Task');

/**
 * task interface.
 *
 * @export
 * @interface ITask
 */
export interface ITask extends ComponentLifecycle {

    /**
     * task instance guid id.
     *
     * @type {string}
     * @memberof ITask
     */
    workflowId?: string;

    /**
     * task context.
     *
     * @type {IContext}
     * @memberof ITask
     */
    context: IContext;

    /**
     * task name.
     *
     * @type {string}
     * @memberof ITask
     */
    name: string;

    /**
     * task run way.
     *
     * @type {RunWay}
     * @memberof ITaskComponent
     */
    runWay: RunWay;

    /**
     * run task.
     *
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof ITask
     */
    run(data?: any): Promise<any>;

}

