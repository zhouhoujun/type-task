import {
    IActivity, Activity, Task, InjectAcitityToken, Condition,
    ActivityBootBuilder, InjectAcitityBuilderToken, WhileConfigure
} from '../core';
import { Singleton } from '@ts-ioc/core';


/**
 * while activity token.
 */
export const WhileActivityToken = new InjectAcitityToken<WhileActivity>('while');
/**
 * While activity builder token
 */
export const WhileActivityBuilderToken = new InjectAcitityBuilderToken<WhileActivityBuilder>('while');

/**
 * while control activity.
 *
 * @export
 * @class WhileActivity
 * @extends {Activity}
 */
@Task(WhileActivityToken, WhileActivityBuilderToken)
export class WhileActivity extends Activity<any> {
    /**
     * while condition.
     *
     * @type {Condition}
     * @memberof WhileActivity
     */
    condition: Condition;
    /**
     * while body.
     *
     * @type {IActivity}
     * @memberof WhileActivity
     */
    body: IActivity;

    async run(data?: any): Promise<any> {
        let condition = await this.context.exec(this, this.condition, data);
        let result;
        while (condition) {
            result = await this.body.run(result || data);
            condition = await this.context.exec(this, this.condition, result)
        }
        return result;

    }
}

/**
 * while activity builder.
 *
 * @export
 * @class WhileActivityBuilder
 * @extends {ActivityBootBuilder}
 */
@Singleton(WhileActivityBuilderToken)
export class WhileActivityBuilder extends ActivityBootBuilder {

    createBuilder() {
        return this.container.get(WhileActivityBuilderToken);
    }

    async buildStrategy(activity: IActivity, config: WhileConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof WhileActivity) {
            activity.body = await this.buildByConfig(config.body, activity.id);
            activity.condition = await this.toExpression(config.while, activity);
        }
        return activity;
    }
}
