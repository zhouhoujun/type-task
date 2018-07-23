import { InjectToken, Registration, Type, Token } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IConfigure, ActivityType } from './IConfigure';
import { IModuleBuilder } from '@ts-ioc/bootstrap';


/**
 * Inject Acitity builder Token
 *
 * @export
 * @class InjectAcitityBuilderToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAcitityBuilderToken<T> extends Registration<T> {
    constructor(desc: string) {
        super('ActivityBuilder', desc);
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

    /**
     * build activity.
     *
     * @param {ActivityType<T>} task
     * @param {string} uuid
     * @returns {Promise<T>}
     * @memberof IActivityBuilder
     */
    build(task: ActivityType<IActivity>, uuid: string): Promise<IActivity>;

    /**
     * create activity instance via token and config.
     *
     * @param {Token<IActivity>} token
     * @param {IConfigure} config
     * @param {string} uuid
     * @returns {Promise<IActivity>}
     * @memberof IActivityBuilder
     */
    createInstance(token: Token<IActivity>, config: IConfigure, uuid: string): Promise<IActivity>;

    /**
     * bundle task config.
     * @param {IActivity} activity
     * @param {IConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof ITaskBuilder
     */
    buildStrategy(activity: IActivity, config: IConfigure): Promise<IActivity>;

    /**
     * get default activity of builder.
     *
     * @returns {Type<IActivity>}
     * @memberof IActivityBuilder
     */
    getDefaultAcitvity(): Type<IActivity>
}
