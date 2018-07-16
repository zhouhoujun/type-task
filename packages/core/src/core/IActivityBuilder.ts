import { InjectToken, IModuleBuilder, Registration, Type } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IConfigure, ActivityResultType } from './IConfigure';


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
     * @param {ActivityResultType<T>} task
     * @param {string} uuid
     * @returns {Promise<IActivity<T>>}
     * @memberof ITaskBuilder
     */
    build<T>(task: ActivityResultType<T>, uuid: string): Promise<IActivity<T>>;
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
     * @returns {Type<IActivity<any>>}
     * @memberof IActivityBuilder
     */
    getDefaultAcitvity(): Type<IActivity<any>>
}
