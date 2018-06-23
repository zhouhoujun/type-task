import { IPipeConfigure, ITestConfigure, ICleanConfigure, PipeTest } from '../core/index';
import { CtxType, Src, ITask } from '@taskfr/core';
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
     * watch source change to run pipe task.
     *
     * @type {CtxType<Src | boolean>}
     * @memberof IPackageConfigure
     */
    watch?: CtxType<Src | boolean>;

    /**
     * clean task config.
     *
     * @type {(CtxType<Src | ICleanConfigure | Token<ITask>>)}
     * @memberof IAssetsConfigure
     */
    clean?: CtxType<Src | ICleanConfigure | Token<ITask>>;
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
    test?: CtxType<Src | ITestConfigure | Token<PipeTest>>;

    /**
     * dest.
     *
     * @type {CtxType<DestType | DestType[]>}
     * @memberof IAssetConfigure
     */
    dest?: CtxType<DestType | DestType[]>;
}
