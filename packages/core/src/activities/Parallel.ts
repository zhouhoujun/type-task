import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, ParallelConfigure, ActivityType, ActivityContext, ContextActivity, } from '../core';



/**
 * parallel activity token.
 */
export const ParallelActivityToken = new InjectAcitityToken<ParallelActivity>('parallel');

/**
 * parallel activity.
 *
 * @export
 * @class ParallelActivity
 * @extends {Activity}
 */
@Task(ParallelActivityToken)
export class ParallelActivity extends ContextActivity {

    activities: IActivity[] = [];

    add(activity: IActivity) {
        this.activities.push(activity);
    }

    async onActivityInit(config: ParallelConfigure): Promise<any> {
        await super.onActivityInit(config);
        if (config.parallel && config.parallel.length) {
            await this.buildChildren(this, config.parallel);
        }
    }

    async buildChildren(activity: ParallelActivity, configs: ActivityType<IActivity>[]) {
        let children = await Promise.all(configs.map(cfg => this.buildActivity(cfg)));
        activity.activities = children;
        return activity;
    }

    /**
     * execute parallel.
     *
     * @protected
     * @param {ActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof ParallelActivity
     */
    protected async execute(ctx: ActivityContext): Promise<void> {
        await Promise.all(this.activities.map(task => task.run(ctx)));
    }

}
