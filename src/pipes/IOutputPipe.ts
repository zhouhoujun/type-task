
import { ITransform } from './ITransform';
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
     * @param {IAssertDist} [assets]
     * @returns {(ITransform | Promise<ITransform>)}
     *
     * @memberof IOutputPipe
     */
    toTransform?(stream: ITransform, assets?: IAssets): ITransform | Promise<ITransform>;
}
