import { Task } from '../decorators';
import { IActivity, Activity, InjectAcitityToken, Condition, WhileConfigure, IActivityContext, ActivityBase } from '../core';


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
export class WhileActivity extends ActivityBase {
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

    protected async execute(): Promise<any> {
        let condition = await this.getContext().exec(this, this.condition);
        while (condition) {
            await this.body.run(this.getContext());
            condition = await this.getContext().exec(this, this.condition)
        }
    }
}
