import { Token } from '@ts-ioc/core';
import { IActivity, Activity, ActivityType } from '../core';
import { IAnnotationBuilder, InjectAnnotationBuilder } from '@ts-ioc/bootstrap';


/**
 * Inject Acitity builder Token
 *
 * @export
 * @class InjectAcitityBuilderToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAcitityBuilderToken<T extends IActivity> extends InjectAnnotationBuilder<T> {
    constructor(type: Token<T>) {
        super(type);
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

/**
 * activity builder token.
 */
export const ActivityBuilderToken = new InjectAcitityBuilderToken<IActivity>(Activity);
