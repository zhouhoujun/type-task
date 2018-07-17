import { IActivity, Task, InjectAcitityToken, Activity, Condition, ActivityBuilder, ActivityResultType, IConfigure, InjectAcitityBuilderToken, ExpressionType } from '../core';
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
 * If activity configure.
 *
 * @export
 * @interface IfConfigure
 * @extends {IConfigure}
 */
export interface IfConfigure extends IConfigure {

    /**
     * while condition
     *
     * @type {ExpressionType<boolean>}
     * @memberof IfConfigure
     */
    if: ExpressionType<boolean>;

    /**
     * if body
     *
     * @type {ActivityResultType<any>}
     * @memberof IfConfigure
     */
    ifBody: ActivityResultType<any>;

    /**
     * else body
     *
     * @type {ActivityResultType<any>}
     * @memberof IfConfigure
     */
    elseBody?: ActivityResultType<any>;

}

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
