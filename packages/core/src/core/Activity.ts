import { Inject, Express } from '@ts-ioc/core';
import { Task } from '../decorators';
import { IActivity, GActivity, ActivityToken } from './IActivity';
import { ActivityConfigure, ExpressionType, Expression, ActivityType } from './ActivityConfigure';
import { ContextToken, IContext } from './IContext';
import { OnActivityInit } from './OnActivityInit';
import { ActivityContext } from './ActivityContext';
import { ContextFactory } from './ContextFactory';



/**
 * base activity.
 *
 * @export
 * @class Activity
 * @implements {GActivity<T>}
 * @template T
 */
@Task
export abstract class Activity<T> implements GActivity<T>, OnActivityInit {

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

    /**
     * context factory.
     *
     * @type {ContextFactory}
     * @memberof Activity
     */
    ctxFactory: ContextFactory;

    constructor() {

    }

    async onActivityInit(config: ActivityConfigure) {
        this.config = config;
    }

    /**
     * run task.
     *
     * @param {ActivityContext} [ctx] execute context.
     * @returns {Promise<T>}
     * @memberof Activity
     */
    async run(ctx?: ActivityContext): Promise<any> {
        ctx = this.verifyCtx(ctx);
        await this.execute(ctx);
        return ctx.execResult;
    }

    /**
     * execute activity.
     *
     * @protected
     * @abstract
     * @param {ActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof Activity
     */
    protected abstract execute(ctx: ActivityContext): Promise<void>;

    /**
     * verify context.
     *
     * @protected
     * @param {*} [ctx]
     * @returns {ActivityContext}
     * @memberof Activity
     */
    protected verifyCtx(ctx?: any): ActivityContext {
        if (!ctx || !(ctx instanceof ActivityContext)) {
            ctx = this.ctxFactory.create(ctx);
        }
        return ctx;
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

/**
 * null activity. do nothing.
 *
 * @export
 * @class NullActivity
 * @extends {Activity<any>}
 */
@Task(ActivityToken)
export class NullActivity extends Activity<any> {

    protected async execute(ctx: ActivityContext): Promise<void> {

    }
}
