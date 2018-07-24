import {
    IActivity, Task, InjectAcitityToken, InjectAcitityBuilderToken,
    ActivityBuilder, Activity, Expression, DelayConfigure
} from '../core';
import { Defer, Singleton } from '@ts-ioc/core';

/**
 * deloy activity token.
 */
export const DelayActivityToken = new InjectAcitityToken<DelayActivity>('delay');

/**
 * deloy activity builder token
 */
export const DelayActivityBuilderToken = new InjectAcitityBuilderToken<DelayActivityBuilder>('delay');


/**
 * while control activity.
 *
 * @export
 * @class DelayActivity
 * @extends {Activity}
 */
@Task(DelayActivityToken, DelayActivityBuilderToken)
export class DelayActivity extends Activity<any> {

    /**
     * delay time.
     *
     * @type {Expression<number>}
     * @memberof DelayActivity
     */
    delay: Expression<number>;

    async run(data?: any): Promise<any> {
        let delay = await this.context.exec(this, this.delay, data);
        let defer = new Defer<any>();
        let timmer = setTimeout(() => {
            defer.resolve(data);
            clearTimeout(timmer);
        }, delay);
        let result = await defer.promise;
        return result;
    }
}

@Singleton(DelayActivityBuilderToken)
export class DelayActivityBuilder extends ActivityBuilder {

    async buildStrategy(activity: IActivity, config: DelayConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof DelayActivity) {
            activity.delay = await this.toExpression(config.delay, activity);
        }

        return activity;
    }
}
