import { IActivity, Task, InjectAcitityToken, Condition, IConfigure, Expression, CtxType } from '../core';
import { Activity } from './Activity';
import { MapSet, Express, isUndefined } from '@ts-ioc/core';

/**
 * Switch activity token.
 */
export const SwitchActivityToken = new InjectAcitityToken<SwitchActivity>('switch');

/**
 * Switch control activity.
 *
 * @export
 * @class SwitchActivity
 * @extends {Activity}
 */
@Task(SwitchActivityToken)
export class SwitchActivity extends Activity {
    /**
     * Switch condition.
     *
     * @type {Expression}
     * @memberof SwitchActivity
     */
    expression: Express<any, boolean>;
    /**
     * Switch body.
     *
     * @type {IActivity}
     * @memberof SwitchActivity
     */
    cases: MapSet<any, IActivity>;

    /**
     * default activity.
     *
     * @type {IActivity}
     * @memberof SwitchActivity
     */
    defaultBody?: IActivity;

    onTaskInit(config: IConfigure) {
        this.cases = this.cases || new MapSet();
    }

    async run(data?: any): Promise<any> {
        let matchkey = this.cases.keys().find(key => this.expression(key));

        if (!isUndefined(matchkey) && this.cases.has(matchkey)) {
            return this.cases.get(matchkey).run(data);
        } else if (this.defaultBody) {
            return this.defaultBody.run(data);
        } else {
            return Promise.resolve(data);
        }

    }
}
