import { Task } from '../decorators';
import { IActivity, Activity, InjectAcitityToken, Condition, WhileConfigure, ActivityContext } from '../core';


/**
 * while activity token.
 */
export const WhileActivityToken = new InjectAcitityToken<WhileActivity>('while');

/**
 * while control activity.
 *
 * @export
 * @class WhileActivity
 * @extends {Activity}
 */
@Task(WhileActivityToken)
export class WhileActivity extends Activity<any> {
    /**
     * while condition.
     *
     * @type {Condition}
     * @memberof WhileActivity
     */
    condition: Condition;
    /**
     * while body.
     *
     * @type {IActivity}
     * @memberof WhileActivity
     */
    body: IActivity;

    async onActivityInit(config: WhileConfigure): Promise<void> {
        await super.onActivityInit(config);
        this.body = await this.buildActivity(config.body);
        this.condition = await this.toExpression(config.while);
    }

    protected async execute(ctx: ActivityContext): Promise<any> {
        let condition = await this.context.exec(this, this.condition, ctx);
        while (condition) {
            await this.body.run(ctx);
            condition = await this.context.exec(this, this.condition, ctx)
        }
    }
}
