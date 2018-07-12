import { CtxType, Src } from '@taskfr/core';
import { ObjectMap } from '@ts-ioc/core';


/**
 * dest type.
 */
export type DestType = string | IDestConfigure;

/**
 *
 *
 * @export
 * @interface AssetConfigure
 * @extends {SourceConfigure}
 * @extends {IDestConfigure}
 */
export interface AssetConfigure extends SourceConfigure {

    /**
     * watch source change to run pipe task.
     *
     * @type {CtxType<Src | boolean>}
     * @memberof IPipeConfigure
     */
    watch?: CtxType<Src | boolean>;

    /**
     * asset pipe dest.
     *
     * @type {CtxType<DestType | DestType[]>}
     * @memberof AssetConfigure
     */
    dest?: CtxType<DestType | DestType[]>;

    /**
     * uglify asset or not.
     *
     * @type {(CtxType<boolean | ObjectMap<any>>)}
     * @memberof AssetConfigure
     */
    uglify?: CtxType<boolean | ObjectMap<any>>;

    /**
     * create source map or not. default create source map at  `./sourcemaps` for js asset and ts asset.
     *
     * @type {(CtxType<boolean | string>)}
     * @memberof AssetConfigure
     */
    sourcemaps?: CtxType<boolean | string>;

}
