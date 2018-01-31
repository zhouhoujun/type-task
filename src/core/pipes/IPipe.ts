import { ITaskContext } from './ITaskContext';
import { TaskString } from './types';
import { ITransform } from './ITransform';
import { IAssets } from './IAssets';

/**
 * pipe work
 *
 * @export
 * @interface IPipe
 */
export interface IPipe  {

    /**
     * transform to pipe work
     *
     * @param {ITaskContext} context
     * @param {IAssets} [assets]
     * @returns {(ITransform | Promise<ITransform>)}
     *
     * @memberof IPipe
     */
    toTransform?(context: ITaskContext, assets?: IAssets): ITransform | Promise<ITransform>;

    /**
     * transform to pipe work
     *
     * @param {ITaskContext} context
     * @param {IAssets} [assets]
     * @returns {(ITransform | Promise<ITransform>)}
     * @memberof IPipe
     */
    pipe?(context: ITaskContext, assets?: IAssets): ITransform | Promise<ITransform>;
}
