import { InjectToken, IModuleBuilder, Registration, Type } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IConfigure, ActivityType } from './IConfigure';


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
     * bundle task config.
     * @param {IActivity} activity
     * @param {IConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof ITaskBuilder
     */
    buildStrategy(activity: IActivity, config: IConfigure): Promise<IActivity>;

    /**
     * get builder.
     *
     * @param {IConfigure} cfg
     * @returns {IActivityBuilder}
     * @memberof IActivityBuilder
     */
    getBuilder(cfg: IConfigure, isToken: boolean): IActivityBuilder;

    /**
     * get default activity of builder.
     *
     * @returns {Type<IActivity>}
     * @memberof IActivityBuilder
     */
    getDefaultAcitvity(): Type<IActivity>
}
