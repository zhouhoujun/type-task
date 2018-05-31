import { ComponentLifecycle } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { RunWay } from './RunWay';



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
     * task name.
     *
     * @type {string}
     * @memberof ITask
     */
    name: string;

    /**
     * config metadata.
     *
     * @type {IConfigure}
     * @memberof ITask
     */
    config?: IConfigure;

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

