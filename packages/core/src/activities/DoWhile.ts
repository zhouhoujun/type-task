import { IActivity, Task, InjectAcitityToken, Condition, Activity, InjectAcitityBuilderToken, ActivityBuilder, IConfigure, ActivityResultType, ExpressionType } from '../core';
import { Singleton } from '@ts-ioc/core';

/**
 * do while activity token.
 */
export const DoWhileActivityToken = new InjectAcitityToken<DoWhileActivity>('dowhile');

/**
 * DoWhile activity builder token
 */
export const DoWhileActivityBuilderToken = new InjectAcitityBuilderToken<DoWhileActivityBuilder>('delay');

/**
 * DoWhile activity configure.
 *
 * @export
 * @interface DoWhileConfigure
 * @extends {IConfigure}
 */
export interface DoWhileConfigure extends IConfigure {
    /**
     * do while
     *
     * @type {ActivityResultType<any>}
     * @memberof DoWhileConfigure
     */
    do: ActivityResultType<any>;

    /**
     * while condition
     *
     * @type {ExpressionType<boolean>}
     * @memberof DoWhileConfigure
     */
    while: ExpressionType<boolean>;
}

/**
 * do while control activity.
 *
 * @export
 * @class DoWhileActivity
 * @extends {Activity}
 */
@Task(DoWhileActivityToken, DoWhileActivityBuilderToken)
export class DoWhileActivity extends Activity<any> {
    /**
     * do while condition.
     *
     * @type {Condition}
     * @memberof DoWhileActivity
     */
    condition: Condition;
    /**
     * do while body.
     *
     * @type {IActivity}
     * @memberof DoWhileActivity
     */
    body: IActivity<any>;

    async run(data?: any): Promise<any> {
        let result = await this.body.run(data);
        let condition = await this.context.exec(this, this.condition, result);
        while (condition) {
            result = await this.body.run(result || data);
            condition = await this.context.exec(this, this.condition, result);
        }
        return result;
    }
}

@Singleton(DoWhileActivityBuilderToken)
export class DoWhileActivityBuilder extends ActivityBuilder {
    async buildStrategy(activity: IActivity<any>, config: DoWhileConfigure): Promise<IActivity<any>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof DoWhileActivity) {
            activity.body = await this.build(config.do, activity.id);
            activity.condition = await this.toExpression(config.while, activity);
        }
        return activity;
    }
}
