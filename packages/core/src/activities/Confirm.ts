import {
    IActivity, Task, InjectAcitityToken, InjectAcitityBuilderToken,
    ActivityBuilder, Activity, Expression, ConfirmConfigure
} from '../core';
import { Defer, Singleton } from '@ts-ioc/core';

/**
 * Confirm activity token.
 */
export const ConfirmActivityToken = new InjectAcitityToken<ConfirmActivity>('Confirm');

/**
 * Confirm activity builder token
 */
export const ConfirmActivityBuilderToken = new InjectAcitityBuilderToken<ConfirmActivityBuilder>('Confirm');

/**
 * while control activity.
 *
 * @export
 * @class ConfirmActivity
 * @extends {Activity}
 */
@Task(ConfirmActivityToken, ConfirmActivityBuilderToken)
export class ConfirmActivity extends Activity<any> {

    defer = new Defer<any>();
    /**
     * Confirm time.
     *
     * @type {Expression<number>}
     * @memberof ConfirmActivity
     */
    confirm: Expression<boolean>;

    async run(data?: any, execute?: IActivity): Promise<any> {
        let confirm = this.context.exec(this, this.confirm, data);
        if (confirm) {
            this.defer.resolve(data);
        } else {
            this.defer.reject();
        }
        return await this.defer.promise;
    }
}

@Singleton(ConfirmActivityBuilderToken)
export class ConfirmActivityBuilder extends ActivityBuilder {

    async buildStrategy(activity: IActivity, config: ConfirmConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof ConfirmActivity) {
            activity.confirm = await this.toExpression(config.confirm, activity);
        }

        return activity;
    }
}
