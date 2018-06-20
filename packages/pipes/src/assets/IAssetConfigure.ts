import { ISourceConfigure, IDestConfigure, ICleanConfigure } from '../core/index';
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
     * clean task config.
     *
     * @type {(CtxType<Src | ICleanConfigure>)}
     * @memberof IAssetConfigure
     */
    clean?: CtxType<Src | ICleanConfigure>;
    /**
     * dest.
     *
     * @type {CtxType<DestType | DestType[]>}
     * @memberof IAssetConfigure
     */
    dest?: CtxType<DestType | DestType[]>;

}
