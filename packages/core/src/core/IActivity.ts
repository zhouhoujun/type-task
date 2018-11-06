import { Registration } from '@ts-ioc/core';
import { IContext } from './IContext';
import { ActivityConfigure } from './ActivityConfigure';
import { OnActivityInit } from './OnActivityInit';
import { IActivityContext, GActivityContext } from './IActivityContext';
import { ContextFactory } from './ContextFactory';

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
 * activity instance.
 */
export type ActivityInstance = IActivity & OnActivityInit;

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
     * task execute context.
     *
     * @type {IContext}
     * @memberof IActivity
     */
    ctx: IActivityContext;

    /**
     * context factory.
     *
     * @type {ContextFactory}
     * @memberof Activity
     */
    ctxFactory: ContextFactory;

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
     * @param {IActivityContext} [ctx]
     * @returns {Promise<any>}
     * @memberof IActivityObject
     */
    run(ctx?: IActivityContext): Promise<any>;
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
     * task execute context.
     *
     * @type {IContext}
     * @memberof IActivity
     */
    ctx: GActivityContext<T>;
    /**
     * run activity.
     *
     * @param {IActivityContext} [ctx]
     * @returns {Promise<T>}
     * @memberof IActivity
     */
    run(ctx?: GActivityContext<T>): Promise<T>;
}

