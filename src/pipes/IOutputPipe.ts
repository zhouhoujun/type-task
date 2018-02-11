
import { ITransform } from './ITransform';
import { ITaskContext } from './ITaskContext';
import { IAssets } from './IAssets';

/**
 * output pipe
 *
 * @export
 * @interface IOutputPipe
 */
export interface IOutputPipe {
    /**
     * output pipes
     *
     * @param {ITransform} stream
     * @param {ITaskContext} context
     * @param {IAssertDist} [assets]
     * @returns {(ITransform | Promise<ITransform>)}
     *
     * @memberof IOutputPipe
     */
    toTransform?(stream: ITransform, context: ITaskContext, assets?: IAssets): ITransform | Promise<ITransform>;
}
