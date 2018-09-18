import { Inject, Express, Registration, Type } from '@ts-ioc/core';
import { Task } from '../decorators';
import { IActivity, GActivity, ActivityToken } from './IActivity';
import { ActivityConfigure, ExpressionType, Expression, ActivityType } from './ActivityConfigure';
import { ContextToken, IContext } from './IContext';
import { OnActivityInit } from './OnActivityInit';
import { ActivityContext, InputDataToken } from './ActivityContext';


/**
 * before dependence activity inject token.
 *
 * @export
 * @class InjectBeforeActivity
 * @extends {Registration<T>}
 * @template T
 */
export class InjectBeforeActivity<T extends IActivity> extends Registration<T> {
    constructor(type: Type<T>) {
        super(type, 'BeforeDepActivity');
    }
}

/**
 * after dependence activity inject token.
 *
 * @export
 * @class InjectBeforeActivity
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAfterActivity<T extends IActivity> extends Registration<T> {
    constructor(type: Type<T>) {
        super(type, 'AfterDepActivity');
    }
}

/**
 * base activity.
 *
 * @export
 * @class Activity
 * @implements {GActivity<T>}
 * @template T
 */
@Task(ActivityToken)
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
        ctx = ctx || this.createCtx();
        await this.before(ctx);
        await this.execute(ctx);
        await this.after(ctx);
        return ctx.data;
    }

    protected createCtx(input?: any): ActivityContext {
        return this.context.getContainer().resolve(ActivityContext, { provide: InputDataToken, useValue: input });
    }

    /**
     * before run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof SequenceActivity
     */
    protected async before(ctx: ActivityContext) {
        if (this.config && this.config.type) {
            let dep = this.context.getContainer().getRefService(InjectBeforeActivity, this.config.type);
            if (dep) {
                return await dep.run(ctx);
            }
        }
    }

    /**
     * execute the activity body.
     *
     * @protected
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns {Promise<any>}
     * @memberof Activity
     */
    protected async execute(ctx: ActivityContext) {
        return;
    }

    /**
     * after run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof SequenceActivity
     */
    protected async after(ctx: ActivityContext) {
        if (this.config && this.config.type) {
            let dep = this.context.getContainer().getRefService(InjectAfterActivity, this.config.type);
            if (dep) {
                return await dep.run(ctx);
            }
        }
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
