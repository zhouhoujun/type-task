import { InjectToken, Registration, IContainer, Express } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { ActivityType, ExpressionType, Expression, IConfigure } from './IConfigure';
import { IModuleBuilder, IBootBuilder } from '@ts-ioc/bootstrap';


/**
 * Inject Acitity builder Token
 *
 * @export
 * @class InjectAcitityBuilderToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAcitityBuilderToken<T extends IActivityBootBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('ActivityBuilder', desc);
    }
}


export interface IActivityBootBuilder extends IBootBuilder<IActivity> {

    buildMdlCfg(activity: ActivityType<any>, data: any): Promise<IActivity>;
    toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>>;
    toActivity<Tr, Ta extends IActivity, TCfg extends IConfigure>(exptype: ExpressionType<Tr> | ActivityType<Ta>, target: IActivity, isRightActivity: Express<any, boolean>, toConfig: Express<Tr, TCfg>, valify?: Express<TCfg, TCfg>): Promise<Ta>
}


export const ActivityBootBuilderToken = new InjectAcitityBuilderToken<IActivityBootBuilder>('activity');


export class InjectAcitityModuleToken<T extends IActivityBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('ActivityModule', desc);
    }
}

/**
 * activity builder token.
 */
export const ActivityBuilderToken = new InjectToken<IActivityBuilder>('__TASK_Builder');

/**
 * builder.
 *
 * @export
 * @interface ITaskBuilder
 */
export interface IActivityBuilder extends IModuleBuilder<IActivity> {

    bootstrap(activity: ActivityType<IActivity>,  uuid?: string, container?: IContainer): Promise<IActivity>;

    // /**
    //  * build activity.
    //  *
    //  * @param {ActivityType<T>} task
    //  * @param {IConfigure} config
    //  * @param {string} uuid
    //  * @returns {Promise<T>}
    //  * @memberof IActivityBuilder
    //  */
    // build(activity: Token<IActivity>, config: IConfigure, uuid: string): Promise<IActivity>;

    // /**
    //  * build activity instance via config.
    //  *
    //  * @param {IActivity} activity
    //  * @param {IConfigure} config
    //  * @returns {Promise<IActivity>}
    //  * @memberof IActivityBuilder
    //  */
    // buildStrategy(activity: IActivity, config: IConfigure): Promise<IActivity>;

}
