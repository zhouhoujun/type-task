import { IActivity, Task, InjectAcitityToken, Condition } from '../core';
import { Activity } from './Activity';

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
export class WhileActivity extends Activity {
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

    async run(data?: any): Promise<any> {
        let condition = await this.context.validate(this.condition, data);
        let result;
        while (condition) {
            result = await this.body.run(data);
            condition = await this.context.validate(this.condition, result);
        }
        return result;

    }
}
