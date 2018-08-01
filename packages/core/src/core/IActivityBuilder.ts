import { InjectToken, Registration, IContainer } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { ActivityType } from './IConfigure';
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

    build(activity: ActivityType<IActivity>, container?: IContainer, uuid?: string): Promise<IActivity>;

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
