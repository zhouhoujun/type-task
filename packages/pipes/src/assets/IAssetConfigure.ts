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
export interface IAssetConfigure extends ISourceConfigure {

    /**
     * test
     *
     * @type {(CtxType<boolean | Src | ITestConfigure>)}
     * @memberof IAssetConfigure
     */
    test?: CtxType<boolean | Src | ITestConfigure>;

    /**
     * dest.
     *
     * @type {CtxType<DestType | DestType[]>}
     * @memberof IAssetConfigure
     */
    dest?: CtxType<DestType | DestType[]>;

}
