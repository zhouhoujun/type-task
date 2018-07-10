import { IActivity, Task, InjectAcitityToken, Condition } from '../core';
import { Activity } from './Activity';

/**
 * while activity token.
 */
export const TryCatchActivityToken = new InjectAcitityToken<TryCatchActivity>('trycatch');

/**
 * while control activity.
 *
 * @export
 * @class TryCatchActivity
 * @extends {Activity}
 */
@Task(TryCatchActivityToken)
export class TryCatchActivity extends Activity {
    /**
     * while condition.
     *
     * @type {Condition}
     * @memberof TryCatchActivity
     */
    condition: Condition;
    /**
     * try activity.
     *
     * @type {IActivity}
     * @memberof TryCatchActivity
     */
    try: IActivity;
    /**
     * catchs activities.
     *
     * @type {IActivity[]}
     * @memberof TryCatchActivity
     */
    catchs: IActivity[];
    /**
     * finally activity.
     *
     * @memberof TryCatchActivity
     */
    finally: IActivity;

    async run(data?: any): Promise<any> {
        let rp;
        try {
            rp = this.try.run(data);
            this.catchs.forEach(cth => {
                rp = rp.catch(r => cth.run(r));
            });
            if (this.finally) {
                rp.then(r => {
                    return this.finally.run(r);
                });
            }
        } catch {
            rp = Promise.resolve(data);
            if (this.finally) {
                rp.then(r => {
                    return this.finally.run(r);
                });
            }
        }

        return rp;
    }
}
