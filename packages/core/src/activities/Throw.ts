import { Task } from '../decorators';
import { InjectAcitityToken, Activity, Expression, ThrowConfigure } from '../core';
/**
 * throw activity token.
 */
export const ThrowActivityToken = new InjectAcitityToken<ThrowActivity>('throw');

/**
 * throw control activity.
 *
 * @export
 * @class ThrowActivity
 * @extends {Activity}
 */
@Task(ThrowActivityToken)
export class ThrowActivity extends Activity {
    /**
     * throw exception error.
     *
     * @type {Condition}
     * @memberof ThrowActivity
     */
    exception: Expression<Error>;

    async onActivityInit(config: ThrowConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.exception = await this.toExpression(config.exception);
    }

    protected async execute(): Promise<void> {
        let error = await this.getContext().exec(this, this.exception);
        throw error;
    }
}
