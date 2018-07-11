import { IActivity, Activity, Task, InjectAcitityToken, Condition, IConfigure, ActivityType, ActivityBuilder, InjectAcitityBuilderToken, isActivityType } from '../core';
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
 * While activity configure.
 *
 * @export
 * @interface WhileConfigure
 * @extends {IConfigure}
 */
export interface WhileConfigure extends IConfigure {

    /**
     * while condition
     *
     * @type {(Condition | ActivityType<any>)}
     * @memberof WhileConfigure
     */
    while: Condition | ActivityType<any>;

    /**
     * while body.
     *
     * @type {ActivityType<any>}
     * @memberof WhileConfigure
     */
    body: ActivityType<any>;
}

/**
 * while control activity.
 *
 * @export
 * @class WhileActivity
 * @extends {Activity}
 */
@Task(WhileActivityToken)
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
    body: IActivity<any>;

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


@Singleton(WhileActivityBuilderToken)
export class WhileActivityBuilder extends ActivityBuilder {
    async buildStrategy<T>(activity: IActivity<T>, config: WhileConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof WhileActivity) {
            activity.body = await this.build<any>(config.body, activity.id);
            if (isActivityType(config.while)) {
                activity.condition = await this.build(config.while, activity.id);
            } else {
                activity.condition = config.while;
            }

        }
        return activity;
    }
}
