import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Activity, Condition, IfConfigure, IActivityContext } from '../core';


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

    protected async execute(ctx?: IActivityContext): Promise<void> {
        let condition = await this.context.exec(this, this.condition, ctx);
        if (condition) {
            await this.execIf(ctx);
        } else if (this.elseBody) {
            await this.execElse(ctx);
        }
    }

    protected async execIf(ctx?: IActivityContext): Promise<void> {
        await this.ifBody.run(ctx);
    }

    protected async execElse(ctx?: IActivityContext): Promise<void> {
        await this.elseBody.run(ctx);
    }

}
