import { Src, ExpressionToken, ConfigureType } from '@taskfr/core';
import { WatchActivity, WatchConfigure, TestActivity, TestConfigure } from '@taskfr/node';
import { ObjectMap } from '@ts-ioc/core';
import { DestConfigure, DestActivity } from './DestActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { SourceActivity, SourceConfigure } from './SourceActivity';
import { SourceMapsActivity, SourceMapsConfigure } from './SourceMapsActivity';
import { AnnotationActivity, AnnotationsConfigure } from './Annotation';
import { UglifyActivity, UglifyConfigure } from './UglifyActivity';

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
     * @type {(ExpressionToken<Src> | ConfigureType<SourceActivity, SourceConfigure>)}
     * @memberof AssetConfigure
     */
    src?: ExpressionToken<Src> | ConfigureType<SourceActivity, SourceConfigure>;
    /**
     * watch activity.
     *
     * @type {(ExpressionToken<Src | boolean> | ConfigureType<WatchActivity, WatchConfigure>)}
     * @memberof AssetConfigure
     */
    watch?: ExpressionToken<Src | boolean> | ConfigureType<WatchActivity, WatchConfigure>;

    /**
     * test config.
     *
     * @type {(ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>)}
     * @memberof PackageConfigure
     */
    test?: ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>;

    /**
     * asset dest activity.
     *
     * @type {(ExpressionToken<string | boolean> | ConfigureType<AnnotationActivity, AnnotationsConfigure>)}
     * @memberof AssetConfigure
     */
    annotation?: ExpressionToken<string | boolean> | ConfigureType<AnnotationActivity, AnnotationsConfigure>;

    /**
     * asset dest activity.
     *
     * @type {(ExpressionToken<string> | ConfigureType<DestActivity, DestConfigure>)}
     * @memberof AssetConfigure
     */
    dest?: ExpressionToken<string> | ConfigureType<DestActivity, DestConfigure>;

    /**
     * uglify asset activity.
     *
     * @type {(ExpressionToken<boolean | ObjectMap<any>> | ConfigureType<UglifyActivity, UglifyConfigure>)}
     * @memberof AssetConfigure
     */
    uglify?: ExpressionToken<boolean | ObjectMap<any>> | ConfigureType<UglifyActivity, UglifyConfigure>;

    /**
     * create source map or not. default create source map at  `./sourcemaps` for js asset and ts asset.
     *
     * @type {(ExpressionToken<boolean | string> | ConfigureType<SourceMapsActivity, SourceMapsConfigure>)}
     * @memberof AssetConfigure
     */
    sourcemaps?: ExpressionToken<boolean | string> | ConfigureType<SourceMapsActivity, SourceMapsConfigure>;

}
