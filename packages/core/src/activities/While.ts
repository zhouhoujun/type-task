import { Task } from '../decorators';
import { IActivity, Activity, InjectAcitityToken, Condition, WhileConfigure } from '../core';


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

    async onActivityInit(config: WhileConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.body = await this.buildActivity(config.body);
        this.condition = await this.toExpression(config.while);
    }

    protected async execute(data?: any): Promise<any> {
        let condition = await this.context.exec(this, this.condition, data);
        let result;
        while (condition) {
            result = await this.body.run(result || data);
            condition = await this.context.exec(this, this.condition, result)
        }
        return result;
    }
}
