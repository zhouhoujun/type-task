import { Src, ExpressionType, ActivityResultType, ActivityType } from '@taskfr/core';
import { ObjectMap } from '@ts-ioc/core';
import { DestConfigure, DestActivity } from './DestActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { SourceActivity } from './SourceActivity';
import { WatchActivity } from './WatchActivity';
import { SourceMapsActivity } from './SourceMapsActivity';



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
     * watch activity.
     *
     * @type {(ExpressionType<Src | boolean> | ActivityType<WatchActivity>)}
     * @memberof AssetConfigure
     */
    watch?: ExpressionType<Src | boolean> | ActivityType<WatchActivity>;

    /**
     * asset dest activity.
     *
     * @type {(ExpressionType<string> | ActivityType<DestActivity>)}
     * @memberof AssetConfigure
     */
    dest?: ExpressionType<string> | ActivityType<DestActivity>;

    /**
     * uglify asset activity.
     *
     * @type {(ExpressionType<boolean | ObjectMap<any>> | ActivityType<WatchActivity>>)}
     * @memberof AssetConfigure
     */
    uglify?: ExpressionType<boolean | ObjectMap<any>> | ActivityType<WatchActivity>;

    /**
     * create source map or not. default create source map at  `./sourcemaps` for js asset and ts asset.
     *
     * @type {(ExpressionType<boolean | string> | ActivityType<SourceMapsActivity>)}
     * @memberof AssetConfigure
     */
    sourcemaps?: ExpressionType<boolean | string> | ActivityType<SourceMapsActivity>;

}
