import { IActivity, Task, InjectAcitityToken, Condition } from '../core';
import { Activity } from './Activity';

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
    exception: Error;

    async run(data?: any): Promise<any> {
        return Promise.reject(this.exception);
    }
}
