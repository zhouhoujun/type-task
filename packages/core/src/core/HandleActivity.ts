import { Activity, ActivityBase } from './Activity';
import { IActivity } from './IActivity';
import { Task } from '../decorators';
import { IActivityContext } from './IActivityContext';

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
     * @param {IActivityContext} [ctx]
     * @param {() => Promise<any>} [next]
     * @returns {Promise<any>}
     * @memberof IHandleActivity
     */
    run(ctx?: IActivityContext, next?: () => Promise<any>): Promise<any>;
}

/**
 * handle activity base.
 *
 * @export
 * @abstract
 * @class HandleActivity
 * @extends {ActivityBase}
 * @implements {IHandleActivity}
 */
@Task
export abstract class HandleActivity extends ActivityBase implements IHandleActivity {

    /**
     * run context.
     *
     * @param {IActivityContext} [ctx]
     * @param {() => Promise<any>} [next]
     * @returns {Promise<any>}
     * @memberof HandleActivity
     */
    async run(ctx?: IActivityContext, next?: () => Promise<any>): Promise<IActivityContext> {
        this.verifyCtx(ctx);
        await this.execute(next);
        return this.getContext()
    }

    /**
     * execute via ctx.
     *
     * @protected
     * @abstract
     * @param {() => Promise<any>} [next]
     * @returns {Promise<void>}
     * @memberof HandleActivity
     */
    protected abstract async execute(next?: () => Promise<any>): Promise<void>;
}
