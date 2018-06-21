import { IPipeConfigure, ITestConfigure, ICleanConfigure } from '../core/index';
import { CtxType, Src } from '@taskp/core';
import { ObjectMap, Token } from '@ts-ioc/core';
import { IAssetConfigure, DestType } from './IAssetConfigure';
import { IAssetPipe } from './IAssetPipe';

export interface IPackageConfigure extends IPipeConfigure {
    /**
     * src path.
     *
     * @type {CtxType<string>}
     * @memberof IPackageConfigure
     */
    src?: CtxType<string>;

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
     * @type {(ObjectMap<Src | IAssetConfigure | Token<IAssetPipe>>)}
     * @memberof IAssetsConfigure
     */
    assets: ObjectMap<Src | IAssetConfigure | Token<IAssetPipe>>;

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
