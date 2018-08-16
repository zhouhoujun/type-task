import { IActivity, Task, InjectAcitityToken, Activity, Expression, ConfirmConfigure } from '../core';
import { Defer } from '@ts-ioc/core';

/**
 * Confirm activity token.
 */
export const ConfirmActivityToken = new InjectAcitityToken<ConfirmActivity>('Confirm');

/**
 * while control activity.
 *
 * @export
 * @class ConfirmActivity
 * @extends {Activity}
 */
@Task(ConfirmActivityToken)
export class ConfirmActivity extends Activity<any> {

    defer = new Defer<any>();
    /**
     * Confirm time.
     *
     * @type {Expression<number>}
     * @memberof ConfirmActivity
     */
    confirm: Expression<boolean>;

    async onActivityInit(config: ConfirmConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.confirm = await this.toExpression(config.confirm, this);
    }

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
