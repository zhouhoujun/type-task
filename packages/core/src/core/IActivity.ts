import { Registration } from '@ts-ioc/core';
import { IContext } from './IContext';
import { IConfigure } from './IConfigure';


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
        super('Activity', desc);
    }
}

/**
 * task token.
 */
export const ActivityToken = new InjectAcitityToken<IActivity<any>>('');


/**
 * activity interface.
 *
 * @export
 * @interface IActivity
 * @template T
 */
export interface IActivity<T> {

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
     * @type {IConfigure}
     * @memberof Activity
     */
    config: IConfigure;

    /**
     * run task.
     *
     * @param {*} [data]
     * @param {IActivity<any>} [target]
     * @returns {Promise<any>}
     * @memberof IActivity
     */
    run(data?: any, target?: IActivity<any>): Promise<T>;

}
