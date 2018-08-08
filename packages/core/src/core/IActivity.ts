import { Registration } from '@ts-ioc/core';
import { IContext } from './IContext';
import { ActivityConfigure } from './ActivityConfigure';


/**
 * Inject AcitityToken
 *
 * @export
 * @class InjectAcitityToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAcitityToken<T extends IActivity> extends Registration<T> {
    constructor(desc: string) {
        super('Activity', desc);
    }
}

/**
 * task token.
 */
export const ActivityToken = new InjectAcitityToken<IActivity>('');

/**
 * activity object.
 *
 * @export
 * @interface IActivity
 */
export interface IActivity {
    /**
     * workflow instance uuid.
     *
     * @type {string}
     * @memberof IActivity
     */
    id: string;

    /**
     * activity display name.
     *
     * @type {string}
     * @memberof IActivity
     */
    name: string;

    /**
     * task context.
     *
     * @type {IContext}
     * @memberof IActivity
     */
    context: IContext;

    /**
     * config.
     *
     * @type {ActivityConfigure}
     * @memberof IActivity
     */
    config: ActivityConfigure;

    /**
     * run task.
     *
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns {Promise<any>}
     * @memberof IActivityObject
     */
    run(data?: any, execute?: IActivity): Promise<any>;
}

/**
 * typed result activity.
 *
 * @export
 * @interface GActivity
 * @template T
 */
export interface GActivity<T> extends IActivity {

    /**
     * run activity.
     *
     * @param {*} [data]
     * @param {IActivity} [target]
     * @returns {Promise<T>}
     * @memberof IActivity
     */
    run(data?: any, target?: IActivity): Promise<T>;

}

