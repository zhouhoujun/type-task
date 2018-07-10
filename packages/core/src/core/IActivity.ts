import { ComponentLifecycle, InjectToken, Registration } from '@ts-ioc/core';
import { IContext } from './IContext';

/**
 * task token.
 */
export const ActivityToken = new InjectToken<IActivity>('Activity');

/**
 * Inject AcitityToken
 *
 * @export
 * @class InjectAcitityToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAcitityToken<T> extends Registration<T> {
    constructor(desc: string) {
        super(ActivityToken.toString(), desc);
    }

}

/**
 * activity interface.
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
     * run task.
     *
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof IActivity
     */
    run(data?: any): Promise<any>;

}

