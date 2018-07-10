import { IActivity, Task, InjectAcitityToken } from '../core';
import { Activity } from './Activity';

/**
 * if activity token.
 */
export const IfActivityToken = new InjectAcitityToken<IfActivity>('if');

/**
 * if control activity.
 *
 * @export
 * @class IfActivity
 * @extends {Activity}
 */
@Task(IfActivityToken)
export class IfActivity extends Activity {
    ifBody: IActivity;
    condition: IActivity;
    elseBody?: IActivity;

    async run(data?: any): Promise<any> {
        let condition = await this.context.validate(this.condition, data);
        if (condition) {
            return this.execIf(data);
        } else if (this.elseBody) {
            return this.execElse(data);
        } else {
            return Promise.resolve(data);
        }
    }

    execIf(data?: any) {
        return this.ifBody.run(data);
    }

    execElse(data?: any) {
        return this.elseBody.run(data);

    }

}
