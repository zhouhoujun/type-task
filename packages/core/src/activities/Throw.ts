import {
    Task, InjectAcitityToken, Activity, Expression,
    ActivityBootBuilder, IActivity, InjectAcitityBuilderToken, ThrowConfigure
} from '../core';
import { Singleton, Injectable } from '@ts-ioc/core';

/**
 * throw activity token.
 */
export const ThrowActivityToken = new InjectAcitityToken<ThrowActivity>('throw');
/**
 * Throw activity builder token
 */
export const ThrowActivityBuilderToken = new InjectAcitityBuilderToken<ThrowActivityBuilder>('delay');

/**
 * throw control activity.
 *
 * @export
 * @class ThrowActivity
 * @extends {Activity}
 */
@Task(ThrowActivityToken, ThrowActivityBuilderToken)
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


@Injectable(ThrowActivityBuilderToken)
export class ThrowActivityBuilder extends ActivityBootBuilder {

    createBuilder() {
        return this.container.get(ThrowActivityBuilderToken);
    }

    async buildStrategy(activity: IActivity, config: ThrowConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof ThrowActivity) {
            activity.exception = await this.toExpression(config.exception, activity);
        }

        return activity;
    }
}
