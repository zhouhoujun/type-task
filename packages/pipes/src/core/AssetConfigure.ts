import { Src, ExpressionType, ActivityResultType, ActivityType } from '@taskfr/core';
import { ObjectMap } from '@ts-ioc/core';
import { DestConfigure, DestActivity } from './DestActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { SourceActivity } from './SourceActivity';
import { WatchActivity } from './WatchActivity';



/**
 * dest type.
 */
export type DestType = string | DestConfigure;

/**
 *
 *
 * @export
 * @interface AssetConfigure
 * @extends {SourceConfigure}
 * @extends {IDestConfigure}
 */
export interface AssetConfigure extends IPipeConfigure {

    /**
     * src config.
     *
     * @type {(ExpressionType<Src> | ActivityType<SourceActivity>)}
     * @memberof AssetConfigure
     */
    src: ExpressionType<Src> | ActivityType<SourceActivity>;
    /**
     * watch source change to run pipe task.
     *
     * @type {CtxType<Src | boolean>}
     * @memberof IPipeConfigure
     */
    watch?: ExpressionType<Src | boolean> | ActivityType<WatchActivity>;

    /**
     * asset pipe dest.
     *
     * @type {CtxType<DestType | DestType[]>}
     * @memberof AssetConfigure
     */
    dest?: ExpressionType<string> | ActivityType<DestActivity>;

    /**
     * uglify asset or not.
     *
     * @type {(CtxType<boolean | ObjectMap<any>>)}
     * @memberof AssetConfigure
     */
    uglify?: ExpressionType<boolean | ObjectMap<any>>;

    /**
     * create source map or not. default create source map at  `./sourcemaps` for js asset and ts asset.
     *
     * @type {(CtxType<boolean | string>)}
     * @memberof AssetConfigure
     */
    sourcemaps?: ExpressionType<boolean | string>;

}
