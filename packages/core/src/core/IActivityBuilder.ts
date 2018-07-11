import { InjectToken, IModuleBuilder, Registration } from '@ts-ioc/core';
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
export interface IActivityBuilder extends IModuleBuilder<IActivity<any>> {

    /**
     * build
     *
     * @template T
     * @param {ActivityType<T>} task
     * @param {string} uuid
     * @returns {Promise<IActivity<T>>}
     * @memberof ITaskBuilder
     */
    build<T>(task: ActivityType<T>, uuid: string): Promise<IActivity<T>>;
    /**
     * bundle task config.
     *
     * @param {IActivity} activity
     * @param {IConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof ITaskBuilder
     */
    buildStrategy<T>(activity: IActivity<T>, config: IConfigure): Promise<IActivity<T>>;

    /**
     * get builder via config.
     *
     * @param {IConfigure} cfg
     * @returns {IActivityBuilder}
     * @memberof ITaskBuilder
     */
    getBuilder(cfg: IConfigure): IActivityBuilder;
}
