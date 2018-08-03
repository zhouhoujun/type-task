import { Inject, Express } from '@ts-ioc/core';
import { Task } from './decorators';
import { IActivity, GActivity } from './IActivity';
import { IConfigure, ExpressionType, Expression, ActivityType } from './IConfigure';
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

    protected async toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>> {
        return this.context.builder.toExpression(exptype, target);
    }

    protected async toActivity<Tr, Ta extends IActivity, TCfg extends IConfigure>(
        exptype: ExpressionType<Tr> | ActivityType<Ta>,
        target: IActivity,
        isRightActivity: Express<any, boolean>,
        toConfig: Express<Tr, TCfg>,
        valify?: Express<TCfg, TCfg>): Promise<Ta> {
        return this.context.builder.toActivity<Tr, Ta, TCfg>(exptype, target, isRightActivity, toConfig, valify);
    }

}
