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

/**
 * activity boot builder.
 *
 * @export
 * @interface IActivityBootBuilder
 * @extends {IBootBuilder<IActivity>}
 */
export interface IActivityBootBuilder extends IBootBuilder<IActivity> {
    /**
     * build module config.
     *
     * @param {ActivityType<any>} activity
     * @param {*} data
     * @returns {Promise<IActivity>}
     * @memberof IActivityBootBuilder
     */
    buildMdlCfg(activity: ActivityType<any>, data: any): Promise<IActivity>;
}


export const ActivityBootBuilderToken = new InjectAcitityBuilderToken<IActivityBootBuilder>('activity');

/**
 * inject acitiity module token.
 *
 * @export
 * @class InjectAcitityModuleToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAcitityModuleToken<T extends IActivityModuleBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('ActivityModule', desc);
    }
}

/**
 * activity builder token.
 */
export const ActivityBuilderToken = new InjectToken<IActivityModuleBuilder>('__TASK_Builder');

/**
 * builder.
 *
 * @export
 * @interface ITaskBuilder
 */
export interface IActivityModuleBuilder extends IModuleBuilder<IActivity> {
    /**
     * bootstap
     *
     * @param {ActivityType<IActivity>} activity
     * @param {string} [uuid]
     * @param {IContainer} [container]
     * @returns {Promise<IActivity>}
     * @memberof IActivityModuleBuilder
     */
    bootstrap(activity: ActivityType<IActivity>, uuid?: string, container?: IContainer): Promise<IActivity>;
}
