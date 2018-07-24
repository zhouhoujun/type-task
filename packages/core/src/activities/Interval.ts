import {
    IActivity, Task, InjectAcitityToken, InjectAcitityBuilderToken,
    ActivityBuilder, Activity, Expression, IntervalConfigure
} from '../core';
import { Singleton } from '@ts-ioc/core';


/**
 * Interval activity token.
 */
export const IntervalActivityToken = new InjectAcitityToken<IntervalActivity>('interval');

/**
 * Interval activity builder token
 */
export const IntervalActivityBuilderToken = new InjectAcitityBuilderToken<IntervalActivityBuilder>('interval');

/**
 * while control activity.
 *
 * @export
 * @class IntervalActivity
 * @extends {Activity}
 */
@Task(IntervalActivityToken, IntervalActivityBuilderToken)
export class IntervalActivity extends Activity<any> {

    /**
     * Interval time.
     *
     * @type {Expression<number>}
     * @memberof IntervalActivity
     */
    interval: Expression<number>;

    body: IActivity;

    async run(data?: any): Promise<any> {
        let interval = await this.context.exec(this, this.interval, data);
        let result = data;
        setInterval(() => {
            this.body.run(result);
        }, interval);
        return data;
    }
}

@Singleton(IntervalActivityBuilderToken)
export class IntervalActivityBuilder extends ActivityBuilder {

    async buildStrategy(activity: IActivity, config: IntervalConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof IntervalActivity) {
            activity.interval = await this.toExpression(config.interval, activity);
            activity.body = await this.build(config.body, activity.id);
        }

        return activity;
    }
}
