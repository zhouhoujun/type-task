import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Activity, Expression, IntervalConfigure } from '../core';


/**
 * Interval activity token.
 */
export const IntervalActivityToken = new InjectAcitityToken<IntervalActivity>('interval');

/**
 * while control activity.
 *
 * @export
 * @class IntervalActivity
 * @extends {Activity}
 */
@Task(IntervalActivityToken)
export class IntervalActivity extends Activity<any> {

    /**
     * Interval time.
     *
     * @type {Expression<number>}
     * @memberof IntervalActivity
     */
    interval: Expression<number>;

    body: IActivity;

    async onActivityInit(config: IntervalConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.interval = await this.toExpression(config.interval);
        this.body = await this.buildActivity(config.body);
    }

    async run(data?: any): Promise<any> {
        let interval = await this.context.exec(this, this.interval, data);
        let result = data;
        setInterval(() => {
            this.body.run(result);
        }, interval);
        return data;
    }
}
