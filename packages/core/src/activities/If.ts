import { IActivity, Task, InjectAcitityToken, Activity, Condition, IfConfigure } from '../core';


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
export class IfActivity extends Activity<any> {
    ifBody: IActivity;
    condition: Condition;
    elseBody?: IActivity;

    async onActivityInit(config: IfConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.ifBody = await this.buildActivity(config.ifBody);
        this.condition = await this.toExpression(config.if);
        if (config.elseBody) {
            this.elseBody = await this.buildActivity(config.elseBody);
        }
    }

    async run(data?: any): Promise<any> {
        let condition = await this.context.exec(this, this.condition, data);
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
