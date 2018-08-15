import { Inject, Express } from '@ts-ioc/core';
import { Task } from './decorators';
import { IActivity, GActivity } from './IActivity';
import { ActivityConfigure, ExpressionType, Expression, ActivityType } from './ActivityConfigure';
import { ContextToken, IContext } from './IContext';
import { OnActivityInit } from './OnActivityInit';

/**
 * base activity.
 *
 * @export
 * @class Activity
 * @implements {GActivity<T>}
 * @template T
 */
@Task
export class Activity<T> implements GActivity<T>, OnActivityInit {

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
     * @type {ActivityConfigure}
     * @memberof Activity
     */
    config: ActivityConfigure;

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

    async onActivityInit(config: ActivityConfigure): Promise<any> {

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

    protected toExpression<T>(exptype: ExpressionType<T>, target?: IActivity): Promise<Expression<T>> {
        return this.context.builder.toExpression(exptype, target || this);
    }

    protected toActivity<Tr, Ta extends IActivity, TCfg extends ActivityConfigure>(
        exptype: ExpressionType<Tr> | ActivityType<Ta>,
        isRightActivity: Express<any, boolean>,
        toConfig: Express<Tr, TCfg>,
        valify?: Express<TCfg, TCfg>,
        target?: IActivity): Promise<Ta> {
        return this.context.builder.toActivity<Tr, Ta, TCfg>(exptype, target || this, isRightActivity, toConfig, valify);
    }

    protected buildActivity<T extends IActivity>(config: ActivityType<T>): Promise<T> {
        return this.context.builder.buildByConfig(config, this.id) as Promise<T>;
    }

}
