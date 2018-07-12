import { CtxType, Src, ExpressionType } from '@taskfr/core';
import { ObjectMap } from '@ts-ioc/core';
import { DestType } from './AssetConfigure';
import { IPipeConfigure } from './IPipeConfigure';
import { TransformConfig } from './pipeTypes';

export interface PackageConfigure extends IPipeConfigure {
    /**
     * src path.
     *
     * @type {ExpressionType<string>}
     * @memberof IPackageConfigure
     */
    src?: ExpressionType<string>;

    /**
     * watch source change to run pipe task.
     *
     * @type {ExpressionType<Src | boolean>}
     * @memberof IPackageConfigure
     */
    watch?: ExpressionType<Src | boolean>;

    /**
     * clean task config.
     *
     * @type {(Src | TransformConfig)}
     * @memberof IAssetsConfigure
     */
    clean?: Src | TransformConfig;
    /**
     * assets.
     *
     * @type {ObjectMap<Src | TransformConfig>}
     * @memberof IAssetsConfigure
     */
    assets: ObjectMap<Src | TransformConfig>;

    /**
     * test config.
     *
     * @type {(Src | TransformConfig)}
     * @memberof IAssetsConfigure
     */
    test?: Src | TransformConfig;

    /**
     * dest.
     *
     * @type {ExpressionType<DestType | DestType[]>}
     * @memberof IAssetConfigure
     */
    dest?: ExpressionType<DestType | DestType[]>;
}
