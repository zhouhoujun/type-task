import { IPipeConfigure, ISourceConfigure, IDestConfigure, ITestConfigure } from '../core/index';
import { CtxType, Src } from '@taskp/core';


/**
 * dest type.
 */
export type DestType = string | IDestConfigure;

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
     * test
     *
     * @type {(CtxType<Src | ITestConfigure>)}
     * @memberof IAssetConfigure
     */
    test?: CtxType<Src | ITestConfigure>;

    /**
     * dest.
     *
     * @type {CtxType<DestType | DestType[]>}
     * @memberof IAssetConfigure
     */
    dest?: CtxType<DestType | DestType[]>;

}
