import { Inject, Express, ContainerToken, IContainer } from '@ts-ioc/core';
import { Task } from '../decorators';
import { IActivity, GActivity, ActivityToken } from './IActivity';
import { ActivityConfigure, ExpressionType, Expression, ActivityType } from './ActivityConfigure';
import { OnActivityInit } from './OnActivityInit';
import { ActivityContext } from './ActivityContext';
import { ContextFactory } from './ContextFactory';
import { GActivityContext, IActivityContext } from './IActivityContext';

/**
 * activity base.
 *
 * @export
 * @abstract
 * @class ActivityBase
 * @implements {IActivity}
 * @implements {OnActivityInit}
 */
@Task
export abstract class Activity implements IActivity, OnActivityInit  {
    @Inject(ContainerToken)
    private container: IContainer;

    protected _ctx: IActivityContext;

    /**
     * context factory.
     *
     * @type {ContextFactory}
     * @memberof Activity
     */
    private _ctxFactory: ContextFactory;

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

    constructor() {

    }

    /**
     * get container.
     *
     * @returns {IContainer}
     * @memberof ActivityBase
     */
    getContainer(): IContainer {
        return this.container;
    }


    /**
     * get context factory.
     *
     * @returns {ContextFactory}
     * @memberof ActivityBase
     */
    getCtxFactory(): ContextFactory {
        if (!this._ctxFactory) {
            let ctxFactory = this.getContainer().resolve(ContextFactory);
            if (this.config && this.config.contextType) {
                ctxFactory.setDefaultContextType(this.config.contextType);
            } else {
                ctxFactory.setDefaultActivityType(this.constructor);
            }
            this._ctxFactory = ctxFactory;
        }
        return this._ctxFactory;
    }

    /**
     *  activity execute context.
     *
     * @type {IActivityContext}
     * @memberof Activity
     */
    getContext(): IActivityContext {
        if (!this._ctx) {
            this._ctx = this.getCtxFactory().create();
        }
        return this._ctx;
    }


    async onActivityInit(config: ActivityConfigure) {
        this.config = config;
    }

    /**
     * run activity.
     *
     * @param {IActivityContext} [ctx]
     * @returns {Promise<IActivityContext>}
     * @memberof ObjectActivity
     */
    async run(ctx?: IActivityContext): Promise<IActivityContext> {
        this.verifyCtx(ctx);
        await this.execute();
        return this.getContext();
    }

    /**
     * execute activity.
     *
     * @protected
     * @abstract
     * @returns {Promise<void>}
     * @memberof Activity
     */
    protected abstract execute(): Promise<void>;

    /**
     * verify context.
     *
     * @protected
     * @param {*} [ctx]
     * @returns {ActivityContext}
     * @memberof Activity
     */
    protected verifyCtx(ctx?: any) {
        if (ctx instanceof ActivityContext) {
            this._ctx = ctx;
        } else {
            this.getContext().setAsResult(ctx);
        }
    }

    protected toExpression<T>(exptype: ExpressionType<T>, target?: IActivity): Promise<Expression<T>> {
        return this.getContext().getBuilder().toExpression(exptype, target || this);
    }

    protected toActivity<Tr, Ta extends IActivity, TCfg extends ActivityConfigure>(
        exptype: ExpressionType<Tr> | ActivityType<Ta>,
        isRightActivity: Express<any, boolean>,
        toConfig: Express<Tr, TCfg>,
        valify?: Express<TCfg, TCfg>,
        target?: IActivity): Promise<Ta> {
        return this.getContext().getBuilder().toActivity<Tr, Ta, TCfg>(exptype, target || this, isRightActivity, toConfig, valify);
    }

    protected buildActivity<T extends IActivity>(config: ActivityType<T>): Promise<T> {
        return this.getContext().getBuilder().buildByConfig(config, this.id) as Promise<T>;
    }
}



/**
 * null activity. do nothing.
 *
 * @export
 * @class NullActivity
 * @extends {Activity}
 */
@Task(ActivityToken)
export class NullActivity extends Activity {

    protected async execute(): Promise<void> {

    }
}
