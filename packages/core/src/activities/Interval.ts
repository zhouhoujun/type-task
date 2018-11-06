import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Activity, Expression, IntervalConfigure, IActivityContext } from '../core';


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

    async onActivityInit(config: IntervalConfigure): Promise<void> {
        await super.onActivityInit(config);
        this.interval = await this.toExpression(config.interval);
        this.body = await this.buildActivity(config.body);
    }

    protected async execute(ctx?: IActivityContext): Promise<void> {
        let interval = await this.context.exec(this, this.interval, ctx);
        setInterval(() => {
            this.body.run(ctx);
        }, interval);
    }
}
