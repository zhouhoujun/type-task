import { IPipeConfigure, ISourceConfigure, TransformExpress, IDestConfigure } from '../core/index';
import { CtxType, Src } from '@taskp/core';

/**
 *
 *
 * @export
 * @interface IAssetConfigure
 * @extends {ISourceConfigure}
 * @extends {IDestConfigure}
 */
export interface IAssetConfigure extends IPipeConfigure {

    /**
     * src.
     *
     * @type {(CtxType<Src | ISourceConfigure>)}
     * @memberof IAssetConfigure
     */
    src?: CtxType<Src | ISourceConfigure>;

    /**
     * uglify assets or not.
     *
     * @type {(boolean | TransformExpress)}
     * @memberof IAssetConfigure
     */
    uglify?: boolean | TransformExpress;

    /**
     * dest.
     *
     * @type {(CtxType<string | IDestConfigure>)}
     * @memberof IAssetConfigure
     */
    dest?: CtxType<string | IDestConfigure>;

}
