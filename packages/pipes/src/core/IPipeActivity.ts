import { GActivity, InjectAcitityBuilderToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Registration } from '@ts-ioc/core';

/**
 * pipe task.
 *
 * @export
 * @interface IPipeTask
 * @extends {GActivity}
 * @template T
 */
export interface IPipeActivity extends GActivity<ITransform> {
    /**
     * pipe task
     *
     * @param {any} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeTask
     */
    run(data?: any): Promise<ITransform>;
}


/**
 * Inject Pipe Activity Token
 *
 * @export
 * @class InjectPipeActivityToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectPipeActivityToken<T extends IPipeActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PipeActivity', desc);
    }
}


/**
 * pipe activity token.
 */
export const PipeActivityToken = new InjectPipeActivityToken<IPipeActivity>('');



/**
 * pipe activity builder token.
 */
export const PipeActivityBuilderToken = new InjectAcitityBuilderToken<IPipeActivity>(PipeActivityToken);
