import { Task, InjectAcitityToken, Activity, Expression, ThrowConfigure } from '../core';
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
export class ThrowActivity extends Activity<any> {
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

    async run(data?: any): Promise<any> {
        let error = await this.context.exec(this, this.exception, data);
        throw error;
    }
}
