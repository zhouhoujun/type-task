import { IPipeConfigure, TestConfigure, ICleanConfigure, PipeTestActivity } from '../core';
import { CtxType, Src, IActivity } from '@taskfr/core';
import { ObjectMap, Token } from '@ts-ioc/core';
import { IAssetConfigure, DestType } from './IAssetConfigure';
import { IAsset } from './IAsset';

export interface IPackageConfigure extends IPipeConfigure {
    /**
     * src path.
     *
     * @type {CtxType<string>}
     * @memberof IPackageConfigure
     */
    src?: CtxType<string>;

    /**
     * watch source change to run pipe task.
     *
     * @type {CtxType<Src | boolean>}
     * @memberof IPackageConfigure
     */
    watch?: CtxType<Src | boolean>;

    /**
     * clean task config.
     *
     * @type {CtxType<Src | ICleanConfigure | Token<IActivity>>}
     * @memberof IAssetsConfigure
     */
    clean?: CtxType<Src | ICleanConfigure | Token<IActivity>>;
    /**
     * assets.
     *
     * @type {ObjectMap<Src | IAssetConfigure | Token<IAsset>>}
     * @memberof IAssetsConfigure
     */
    assets: ObjectMap<Src | IAssetConfigure | Token<IAsset>>;

    /**
     * test config.
     *
     * @type {CtxType<boolean | Src | TestConfigure | Token<PipeTestActivity>>}
     * @memberof IAssetsConfigure
     */
    test?: CtxType<boolean | Src | TestConfigure | Token<PipeTestActivity>>;

    /**
     * dest.
     *
     * @type {CtxType<DestType | DestType[]>}
     * @memberof IAssetConfigure
     */
    dest?: CtxType<DestType | DestType[]>;
}
