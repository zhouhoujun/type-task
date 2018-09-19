import { Activity } from './Activity';
import { IActivity } from './IActivity';
import { ActivityContext } from './ActivityContext';
import { Task } from '../decorators';

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
@Task
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
        await this.execute(ctx, next);
        return ctx.data;
    }

    /**
     * execute via ctx.
     *
     * @protected
     * @abstract
     * @param {ActivityContext} ctx
     * @param {() => Promise<any>} [next]
     * @returns {Promise<void>}
     * @memberof HandleActivity
     */
    protected abstract async execute(ctx: ActivityContext, next?: () => Promise<any>): Promise<void>;
}
