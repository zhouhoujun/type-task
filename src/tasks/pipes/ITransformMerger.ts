import { ITransform } from './ITransform';

/**
 * transforms merger.
 *
 * @export
 * @interface ITransformMerger
 */
export interface ITransformMerger {
    /**
     * merge transforms
     *
     * @param {ITransform[]} transforms
     * @returns {ITransform}
     * @memberof ITransformMerger
     */
    merge(transforms: ITransform[]): ITransform;
}
