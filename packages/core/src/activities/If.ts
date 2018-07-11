import { IActivity, Task, InjectAcitityToken, Activity, Condition, ActivityBuilder, isActivityType, ActivityType, IConfigure, InjectAcitityBuilderToken } from '../core';
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
     * @type {(Condition | ActivityType<any>)}
     * @memberof IfConfigure
     */
    if: Condition | ActivityType<any>;

    /**
     * if body
     *
     * @type {ActivityType<any>}
     * @memberof IfConfigure
     */
    ifBody: ActivityType<any>;

    /**
     * else body
     *
     * @type {ActivityType<any>}
     * @memberof IfConfigure
     */
    elseBody?: ActivityType<any>;

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
    ifBody: IActivity<any>;
    condition: Condition;
    elseBody?: IActivity<any>;

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
    async buildStrategy<T>(activity: IActivity<T>, config: IfConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof IfActivity) {
            activity.ifBody = await this.build<T>(config.ifBody, activity.id);
            if (isActivityType(config.if)) {
                activity.condition = await this.build<boolean>(config.if, activity.id);
            } else {
                activity.condition = config.if;
            }

            if (config.elseBody) {
                activity.elseBody = await this.build<T>(config.elseBody, activity.id);
            }
        }
        return activity;
    }
}
