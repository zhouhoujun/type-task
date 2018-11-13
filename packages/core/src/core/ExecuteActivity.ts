import { Task } from '../decorators';
import { Activity } from './Activity';
import { GActivity } from './IActivity';
import { OnActivityInit } from './OnActivityInit';
import { GActivityContext, IActivityContext } from './IActivityContext';

/**
 * execute activity.
 *
 * @export
 * @class Activity
 * @implements {GActivity<T>}
 * @template T
 */
@Task
export abstract class ExecuteActivity<T> extends Activity implements GActivity<T>, OnActivityInit {

    /**
     *  activity execute context.
     *
     * @type {ActivityContext}
     * @memberof Activity
     */
    getContext(): GActivityContext<T> {
        return super.getContext();
    }
    /**
     * run task.
     *
     * @param {ActivityContext} [ctx] execute context.
     * @returns {Promise<T>}
     * @memberof Activity
     */
    async run(ctx?: IActivityContext): Promise<GActivityContext<T>> {
        this.verifyCtx(ctx);
        await this.execute();
        return this.getContext();
    }

}
