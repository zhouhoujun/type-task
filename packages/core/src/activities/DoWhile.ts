import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Condition, Activity, DoWhileConfigure, ActivityContext } from '../core';

/**
 * do while activity token.
 */
export const DoWhileActivityToken = new InjectAcitityToken<DoWhileActivity>('dowhile');

/**
 * do while control activity.
 *
 * @export
 * @class DoWhileActivity
 * @extends {Activity}
 */
@Task(DoWhileActivityToken)
export class DoWhileActivity extends Activity<any> {
    /**
     * do while condition.
     *
     * @type {Condition}
     * @memberof DoWhileActivity
     */
    condition: Condition;
    /**
     * do while body.
     *
     * @type {IActivity}
     * @memberof DoWhileActivity
     */
    body: IActivity;

    async onActivityInit(config: DoWhileConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.body = await this.buildActivity(config.do);
        this.condition = await this.toExpression(config.while);
    }

    protected async execute(ctx?: ActivityContext): Promise<any> {
        await this.body.run(ctx);
        let condition = await this.context.exec(this, this.condition, ctx);
        while (condition) {
            await this.body.run(ctx);
            condition = await this.context.exec(this, this.condition, ctx);
        }
    }
}
