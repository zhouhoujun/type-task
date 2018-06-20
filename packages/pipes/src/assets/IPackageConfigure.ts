import { IPipeConfigure, ITestConfigure, ICleanConfigure } from '../core/index';
import { CtxType, Src } from '@taskp/core';
import { ObjectMap } from '@ts-ioc/core';
import { IAssetConfigure, DestType } from './IAssetConfigure';

export interface IPackageConfigure extends IPipeConfigure {
    /**
     * clean task config.
     *
     * @type {(CtxType<Src | ICleanConfigure>)}
     * @memberof IAssetsConfigure
     */
    clean?: CtxType<Src | ICleanConfigure>;
    /**
     * assets.
     *
     * @type {(ObjectMap<Src | IAssetConfigure>)}
     * @memberof IAssetsConfigure
     */
    assets: ObjectMap<Src | IAssetConfigure>;

    /**
     * test config.
     *
     * @type {(CtxType<Src | ITestConfigure>)}
     * @memberof IAssetsConfigure
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
