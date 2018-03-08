import { ITransform } from './ITransform';

/**
 * transforms merger.
 *
 * @export
 * @interface ITransformReference
 */
export interface ITransformReference {

    /**
     * bind transform reference
     *
     * @param {ITransform} transform
     * @returns {Promise<ITransform>}
     * @memberof ITransformReference
     */
    bindRefer(transform: ITransform): Promise<ITransform>;
}
