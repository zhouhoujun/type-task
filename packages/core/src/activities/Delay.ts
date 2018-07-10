import { IActivity, Task, InjectAcitityToken, Condition } from '../core';
import { Activity } from './Activity';
import { Defer } from '@ts-ioc/core';

/**
 * while activity token.
 */
export const DelayActivityToken = new InjectAcitityToken<DelayActivity>('delay');

/**
 * while control activity.
 *
 * @export
 * @class DelayActivity
 * @extends {Activity}
 */
@Task(DelayActivityToken)
export class DelayActivity extends Activity {

    /**
     * delay time.
     *
     * @type {IActivity}
     * @memberof DelayActivity
     */
    delay: number;

    async run(data?: any): Promise<any> {
        let defer =  new Defer<any>();
        let timmer = setTimeout(() => {
            defer.resolve(data);
            clearTimeout(timmer);
        }, this.delay);
        return defer.promise;
    }
}
