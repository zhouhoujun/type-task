import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Activity, Condition, IfConfigure } from '../core';


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

    protected async execute(): Promise<void> {
        let condition = await this.getContext().exec(this, this.condition);
        if (condition) {
            await this.execIf();
        } else if (this.elseBody) {
            await this.execElse();
        }
    }

    protected async execIf(): Promise<void> {
        await this.ifBody.run(this.getContext());
    }

    protected async execElse(): Promise<void> {
        await this.elseBody.run(this.getContext());
    }

}
