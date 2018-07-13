import { Inject } from '@ts-ioc/core';
import { Task } from './decorators';
import { IActivity } from './IActivity';
import { IConfigure } from './IConfigure';
import { ContextToken, IContext } from './IContext';


@Task
export class Activity<T> implements IActivity<T> {

    /**
     * workflow instance uuid.
     *
     * @type {string}
     * @memberof IActivity
     */
    id: string;
    /**
     * activity display name.
     *
     * @type {string}
     * @memberof Activity
     */
    name: string;
    /**
     * config.
     *
     * @type {IConfigure}
     * @memberof Activity
     */
    config: IConfigure;

    /**
     * task context.
     *
     * @type {IContext}
     * @memberof Activity
     */
    @Inject(ContextToken)
    context: IContext;

    constructor() {

    }

    /**
     * run task.
     *
     * @param {*} [data] execut data.
     * @param {IActivity<any>} [execute] execute activity.
     * @returns {Promise<T>}
     * @memberof Activity
     */
    run(data?: any, execute?: IActivity<any>): Promise<T> {
        return Promise.resolve(data);
    }

}
