import { Inject, isToken, Express, isString } from '@ts-ioc/core';
import { Task } from './decorators';
import { IActivity, GActivity } from './IActivity';
import { IConfigure, isActivityType, ExpressionType, Expression, ActivityType } from './IConfigure';
import { ContextToken, IContext } from './IContext';

/**
 * base activity.
 *
 * @export
 * @class Activity
 * @implements {GActivity<T>}
 * @template T
 */
@Task
export class Activity<T> implements GActivity<T> {

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
     * @param {IActivity} [execute] execute activity.
     * @returns {Promise<T>}
     * @memberof Activity
     */
    run(data?: any, execute?: IActivity): Promise<T> {
        return Promise.resolve(data);
    }

}
