
import { SourceActivity, SourceConfigure, SourceActivityBuilder } from './SourceActivity';
import { IntervalActivity, IActivity, ActivityType, ExpressionType, IntervalConfigure } from '@taskfr/core';
import { InjectPipeActivityToken, InjectPipeAcitityBuilderToken } from './IPipeActivity';
import { Singleton } from '@ts-ioc/core';



export const WatchAcitvityToken = new InjectPipeActivityToken<WatchActivity>('Watch');
export const WatchAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<WatchActivityBuilder>('Watch')

/**
 * watch configure.
 *
 * @export
 * @interface WatchConfigure
 * @extends {SourceConfigure}
 */
export interface WatchConfigure extends SourceConfigure {

    /**
     * interval.
     *
     * @type {(ExpressionType<number> | ActivityType<IntervalActivity>)}
     * @memberof WatchConfigure
     */
    interval?: ExpressionType<number> | ActivityType<IntervalActivity>

}

export class WatchActivity extends SourceActivity {
    interval: IntervalActivity;


}



@Singleton(WatchAcitvityBuilderToken)
export class WatchActivityBuilder extends SourceActivityBuilder {

    async buildStrategy(activity: IActivity<any>, config: WatchConfigure): Promise<IActivity<any>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof WatchActivity) {
            config.interval = config.interval || 500;

            activity.interval = await this.toActivity<number, IntervalActivity>(config.interval, activity,
                act => act instanceof IntervalActivity,
                interval => {
                    return <IntervalConfigure>{ interval: interval, body: activity, task: IntervalActivity };
                });


        }
        return activity;
    }
}
