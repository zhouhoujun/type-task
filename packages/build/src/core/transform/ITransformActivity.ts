import { IActivityResult, InjectAcitityBuilderToken, IActivityContext } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Registration } from '@ts-ioc/core';
import { TransformationContext } from 'typescript';

/**
 * pipe task.
 *
 * @export
 * @interface IPipeTask
 * @extends {IActivityResult}
 * @template T
 */
export interface ITransformActivity extends IActivityResult<ITransform> {

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
