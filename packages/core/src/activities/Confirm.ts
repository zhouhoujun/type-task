import { Defer } from '@ts-ioc/core';
import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Activity, Expression, ConfirmConfigure } from '../core';


/**
 * Confirm activity token.
 */
export const ConfirmActivityToken = new InjectAcitityToken<ConfirmActivity<any>>('Confirm');

/**
 * while control activity.
 *
 * @export
 * @class ConfirmActivity
 * @extends {Activity}
 */
@Task(ConfirmActivityToken)
export class ConfirmActivity<T> extends Activity<T> {

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

    protected async execute(data?: any, execute?: IActivity): Promise<T> {
        let confirm = this.context.exec(this, this.confirm, data);
        if (confirm) {
            this.defer.resolve(data);
        } else {
            this.defer.reject();
        }
        return await this.defer.promise;
    }
}
