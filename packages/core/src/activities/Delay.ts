import { IActivity, Task, InjectAcitityToken, Condition, InjectAcitityBuilderToken, ActivityBuilder, IConfigure, CtxType, Activity, ActivityResult, ActivityType, isActivityType } from '../core';
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
 * delay activity configure.
 *
 * @export
 * @interface DelayConfigure
 * @extends {IConfigure}
 */
export interface DelayConfigure extends IConfigure {
    /**
     * delay ms.
     *
     * @type {CtxType<number>}
     * @memberof DelayConfigure
     */
    delay?: ActivityResult<number> | ActivityType<number>;
}

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
     * @type {ActivityResult<number>}
     * @memberof DelayActivity
     */
    delay: ActivityResult<number>;

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

    async buildStrategy<T>(activity: IActivity<T>, config: DelayConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof DelayActivity) {
            if (isActivityType(config.delay)) {
                activity.delay = await this.build(config.delay, activity.id);
            } else {
                activity.delay = config.delay;
            }
        }

        return activity;
    }
}
