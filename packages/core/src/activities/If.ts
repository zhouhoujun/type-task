import {
    IActivity, Task, InjectAcitityToken, Activity,
    Condition, ActivityBuilder, InjectAcitityBuilderToken, IfConfigure
} from '../core';
import { Singleton } from '@ts-ioc/core';

/**
 * if activity token.
 */
export const IfActivityToken = new InjectAcitityToken<IfActivity>('if');
/**
 * If activity builder token
 */
export const IfActivityBuilderToken = new InjectAcitityBuilderToken<IfActivityBuilder>('if');

/**
 * if control activity.
 *
 * @export
 * @class IfActivity
 * @extends {Activity}
 */
@Task(IfActivityToken, IfActivityBuilderToken)
export class IfActivity extends Activity<any> {
    ifBody: IActivity;
    condition: Condition;
    elseBody?: IActivity;

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

@Singleton(IfActivityBuilderToken)
export class IfActivityBuilder extends ActivityBuilder {
    async buildStrategy(activity: IActivity, config: IfConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof IfActivity) {
            activity.ifBody = await this.build(config.ifBody, activity.id);
            activity.condition = await this.toExpression(config.if, activity);
            if (config.elseBody) {
                activity.elseBody = await this.build(config.elseBody, activity.id);
            }
        }
        return activity;
    }
}
