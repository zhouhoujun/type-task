import {
    IActivity, Task, InjectAcitityToken,
    Activity, InjectAcitityBuilderToken,
    ActivityBootBuilder, Expression, SwitchConfigure
} from '../core';
import { MapSet, isUndefined, Injectable, Singleton } from '@ts-ioc/core';

/**
 * Switch activity token.
 */
export const SwitchActivityToken = new InjectAcitityToken<SwitchActivity>('switch');
/**
 * Switch activity builder token
 */
export const SwitchActivityBuilderToken = new InjectAcitityBuilderToken<SwitchActivityBuilder>('switch');


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
     * @type {Expression<any>}
     * @memberof SwitchActivity
     */
    expression: Expression<any>;
    /**
     * Switch body.
     *
     * @type {MapSet<any, IActivity>}
     * @memberof SwitchActivity
     */
    cases: MapSet<any, IActivity> = new MapSet();

    /**
     * default activity.
     *
     * @type {IActivity}
     * @memberof SwitchActivity
     */
    defaultBody?: IActivity;

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
export class SwitchActivityBuilder extends ActivityBootBuilder {

    async buildStrategy(activity: IActivity, config: SwitchConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof SwitchActivity) {
            activity.expression = await this.toExpression(config.expression, activity);
            if (config.cases && config.cases.length) {
                await Promise.all(config.cases.map(async (cs) => {
                    let val = await this.buildByConfig(cs.value, activity.id);
                    activity.cases.set(cs.key, val);
                    return val;
                }));
            }

            if (config.defaultBody) {
                activity.defaultBody = await this.buildByConfig(config.defaultBody, activity.id);
            }
        }
        return activity;
    }
}
