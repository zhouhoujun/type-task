import { IActivity, Task, InjectAcitityToken, Condition } from '../core';
import { Activity } from './Activity';

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
export class DoWhileActivity extends Activity {
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

    async run(data?: any): Promise<any> {
        let result = await this.body.run(data);
        let condition = await this.context.validate(this.condition, result);
        while (condition) {
            result = await this.body.run(data);
            condition = await this.context.validate(this.condition, result);
        }
        return result;
    }
}
