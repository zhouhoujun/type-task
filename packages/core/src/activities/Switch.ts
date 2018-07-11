import { IActivity, Task, InjectAcitityToken, IConfigure, Activity, InjectAcitityBuilderToken, ActivityBuilder, isActivityType, ActivityType, Expression, KeyValue } from '../core';
import { MapSet, Express, isUndefined, Singleton } from '@ts-ioc/core';

/**
 * Switch activity token.
 */
export const SwitchActivityToken = new InjectAcitityToken<SwitchActivity>('switch');
/**
 * Switch activity builder token
 */
export const SwitchActivityBuilderToken = new InjectAcitityBuilderToken<SwitchActivityBuilder>('switch');

/**
 * Switch activity configure.
 *
 * @export
 * @interface SwitchConfigure
 * @extends {IConfigure}
 */
export interface SwitchConfigure extends IConfigure {

    /**
     * while condition
     *
     * @type {(Condition | ActivityType<any>)}
     * @memberof SwitchConfigure
     */
    expression: Expression<any> | ActivityType<any>;

    /**
     * if body
     *
     * @type {KeyValue<any, ActivityType<any>>[]}
     * @memberof SwitchConfigure
     */
    cases: KeyValue<any, ActivityType<any>>[];

    /**
     * default body
     *
     * @type {ActivityType<any>}
     * @memberof SwitchConfigure
     */
    defaultBody?: ActivityType<any>;

}
/**
 * Switch control activity.
 *
 * @export
 * @class SwitchActivity
 * @extends {Activity}
 */
@Task(SwitchActivityToken, SwitchActivityBuilderToken)
export class SwitchActivity extends Activity<any> {
    /**
     * Switch condition.
     *
     * @type {Expression}
     * @memberof SwitchActivity
     */
    expression: Expression<any>;
    /**
     * Switch body.
     *
     * @type {IActivity}
     * @memberof SwitchActivity
     */
    cases: MapSet<any, IActivity<any>> = new MapSet();

    /**
     * default activity.
     *
     * @type {IActivity}
     * @memberof SwitchActivity
     */
    defaultBody?: IActivity<any>;

    async run(data?: any): Promise<any> {
        let matchkey = await this.context.exec<any>(this, this.expression, data);
        if (!isUndefined(matchkey) && this.cases.has(matchkey)) {
            return this.cases.get(matchkey).run(data);
        } else if (this.defaultBody) {
            return this.defaultBody.run(data);
        } else {
            return Promise.resolve(data);
        }

    }
}

@Singleton(SwitchActivityBuilderToken)
export class SwitchActivityBuilder extends ActivityBuilder {
    async buildStrategy<T>(activity: IActivity<T>, config: SwitchConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof SwitchActivity) {
            if (isActivityType(config.expression)) {
                activity.expression = await this.build<boolean>(config.expression, activity.id);
            } else {
                activity.expression = config.expression;
            }

            if (config.cases && config.cases.length) {
                await Promise.all(config.cases.map(async (cs) => {
                    let val = await this.build(cs.value, activity.id);
                    activity.cases.set(cs.key, val);
                    return val;
                }));
            }

            if (config.defaultBody) {
                activity.defaultBody = await this.build<T>(config.defaultBody, activity.id);
            }
        }
        return activity;
    }
}
