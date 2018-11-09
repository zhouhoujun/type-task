import { Task } from '../decorators';
import { InjectAcitityToken, Expression, ConfirmConfigure, IActivity, Activity } from '../core';


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
export class ConfirmActivity extends Activity {
    /**
     * Confirm time.
     *
     * @type {Expression<number>}
     * @memberof ConfirmActivity
     */
    confirm: Expression<boolean>;

    /**
     * confirm execute body.
     *
     * @type {IActivity}
     * @memberof ConfirmActivity
     */
    body: IActivity;

    async onActivityInit(config: ConfirmConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.confirm = await this.toExpression(config.confirm, this);
        this.body = await this.buildActivity(config.body);
    }

    protected async execute() {
        let confirm = this.getContext().exec(this, this.confirm);
        if (confirm) {
            this.body.run(this.getContext());
        }
    }
}
