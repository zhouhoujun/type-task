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
export interface ITransformActivity extends GActivity<ITransform> {
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
export class InjectTransformActivityToken<T extends ITransformActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PipeActivity', desc);
    }
}


/**
 * Transform activity token.
 */
export const TransformActivityToken = new InjectTransformActivityToken<ITransformActivity>('');



/**
 * Transform activity builder token.
 */
export const TransformActivityBuilderToken = new InjectAcitityBuilderToken<ITransformActivity>(TransformActivityToken);
