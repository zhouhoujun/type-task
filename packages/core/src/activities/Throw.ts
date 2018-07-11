import { Task, InjectAcitityToken, Activity, Expression, IConfigure, ActivityResult, ActivityType, ActivityBuilder, IActivity, isActivityType, InjectAcitityBuilderToken } from '../core';
import { Singleton } from '@ts-ioc/core';

/**
 * throw activity token.
 */
export const ThrowActivityToken = new InjectAcitityToken<ThrowActivity>('throw');
/**
 * Throw activity builder token
 */
export const ThrowActivityBuilderToken = new InjectAcitityBuilderToken<ThrowActivityBuilder>('delay');

/**
 * Throw activity configure.
 *
 * @export
 * @interface ThrowConfigure
 * @extends {IConfigure}
 */
export interface ThrowConfigure extends IConfigure {
    /**
     * delay ms.
     *
     * @type {CtxType<number>}
     * @memberof ThrowConfigure
     */
    exception?: Expression<Error> | ActivityType<Error>;
}
/**
 * throw control activity.
 *
 * @export
 * @class ThrowActivity
 * @extends {Activity}
 */
@Task(ThrowActivityToken)
export class ThrowActivity extends Activity<any> {
    /**
     * throw exception error.
     *
     * @type {Condition}
     * @memberof ThrowActivity
     */
    exception: Expression<Error>;

    async run(data?: any): Promise<any> {
        let error = await this.context.exec(this, this.exception, data);
        throw error;
    }
}


@Singleton(ThrowActivityBuilderToken)
export class ThrowActivityBuilder extends ActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: ThrowConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof ThrowActivity) {
            if (isActivityType(config.exception)) {
                activity.exception = await this.build(config.exception, activity.id);
            } else {
                activity.exception = config.exception;
            }
        }

        return activity;
    }
}