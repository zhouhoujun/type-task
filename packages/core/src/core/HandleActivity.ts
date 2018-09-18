import { Activity } from './Activity';
import { IActivity } from './IActivity';
import { ActivityContext } from './ActivityContext';

/**
 * handle activity interface.
 *
 * @export
 * @interface IHandleActivity
 * @extends {IActivity}
 */
export interface IHandleActivity extends IActivity {
    /**
     * run task.
     *
     * @param {ActivityContext} [ctx]
     * @param {() => Promise<any>} [next]
     * @returns {Promise<any>}
     * @memberof IHandleActivity
     */
    run(ctx?: ActivityContext, next?: () => Promise<any>): Promise<any>;
}

/**
 * handle activity base.
 *
 * @export
 * @abstract
 * @class HandleActivity
 * @extends {Activity<any>}
 * @implements {IHandleActivity}
 */
export abstract class HandleActivity extends Activity<any> implements IHandleActivity {

    /**
     * run context.
     *
     * @param {ActivityContext} [ctx]
     * @param {() => Promise<any>} [next]
     * @returns {Promise<any>}
     * @memberof HandleActivity
     */
    async run(ctx?: ActivityContext, next?: () => Promise<any>): Promise<any> {
        ctx = ctx || this.createCtx();
        let canHanle = await this.canHanle(ctx);
        if (!canHanle) {
            return await next();
        }
        return await super.run(ctx);
    }

    /**
     * can handle deal with ctx input.
     *
     * @protected
     * @abstract
     * @param {ActivityContext} ctx
     * @returns {Promise<boolean>}
     * @memberof HandleActivity
     */
    protected abstract async canHanle(ctx: ActivityContext): Promise<boolean>;
    /**
     * execute via ctx.
     *
     * @protected
     * @abstract
     * @param {ActivityContext} ctx
     * @memberof HandleActivity
     */
    protected abstract async execute(ctx: ActivityContext);
}
