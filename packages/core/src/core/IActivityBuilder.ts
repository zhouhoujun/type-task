import { Registration } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { ActivityType } from './ActivityConfigure';
import { IAnnotationBuilder } from '@ts-ioc/bootstrap';


/**
 * Inject Acitity builder Token
 *
 * @export
 * @class InjectAcitityBuilderToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAcitityBuilderToken<T extends IActivityBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('ActivityBuilder', desc);
    }
}

/**
 * activity boot builder.
 *
 * @export
 * @interface IActivityBuilder
 * @extends {IAnnotationBuilder<IActivity>}
 */
export interface IActivityBuilder extends IAnnotationBuilder<IActivity> {
    /**
     * build by config.
     *
     * @param {ActivityType<any>} activity
     * @param {*} data
     * @returns {Promise<IActivity>}
     * @memberof IActivityTypeBuilder
     */
    buildByConfig(activity: ActivityType<any>, data: any): Promise<IActivity>;
}


export const ActivityBuilderToken = new InjectAcitityBuilderToken<IActivityBuilder>('activity');
