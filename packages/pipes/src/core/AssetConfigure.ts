import { Src, ExpressionToken, IActivityBuilder, IActivityConfigure, ConfigureType } from '@taskfr/core';
import { ObjectMap, Registration } from '@ts-ioc/core';
import { DestConfigure, DestActivity } from './DestActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { SourceActivity, SourceConfigure } from './SourceActivity';
import { WatchActivity, WatchConfigure } from './WatchActivity';
import { SourceMapsActivity, SourceMapsConfigure } from './SourceMapsActivity';
import { AnnotationActivity, AnnotationConfigure } from './Annotation';
import { IPipeActivity } from './IPipeActivity';
import { UglifyActivity, UglifyConfigure } from './UglifyActivity';
import { TestActivity, TestConfigure } from './TestActivity';

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
     * @type {(ExpressionToken<string | boolean> | ConfigureType<AnnotationActivity, AnnotationConfigure>)}
     * @memberof AssetConfigure
     */
    annotation?: ExpressionToken<string | boolean> | ConfigureType<AnnotationActivity, AnnotationConfigure>;

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


/**
 * asset activity.
 *
 * @export
 * @interface IAssetActivity
 * @extends {IPipeActivity}
 */
export interface IAssetActivity extends IPipeActivity {

    /**
     * src activity.
     *
     * @type {SourceActivity}
     * @memberof AssetActivity
     */
    src: SourceActivity;

    /**
     * dest activity.
     *
     * @type {(DestActivity | DestActivity[])}
     * @memberof AssetActivity
     */
    dest: DestActivity | DestActivity[];

    /**
     * watch activity.
     *
     * @type {WatchActivity}
     * @memberof AssetActivity
     */
    watch: WatchActivity;

    /**
     * source maps activity of asset.
     *
     * @type {SourceMapsActivity}
     * @memberof AssetActivity
     */
    sourcemaps: SourceMapsActivity;

    /**
     * uglify for asset actvity.
     *
     * @type {UglifyActivity}
     * @memberof AssetActivity
     */
    uglify: UglifyActivity;

    /**
     * asset annotation.
     *
     * @type {AnnotationActivity}
     * @memberof AssetActivity
     */
    annotation: AnnotationActivity;

    /**
     * default annottion.
     *
     * @type {IActivityConfigure<AnnotationActivity>}
     * @memberof AssetActivity
     */
    defaultAnnotation?: IActivityConfigure<AnnotationActivity>;
}


export class InjectAssetActivityToken<T extends IAssetActivity> extends Registration<T> {
    constructor(desc: string) {
        super('AssetActivity', desc);
    }
}

export class InjectAssetActivityBuilderToken<T extends IActivityBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('AssetActivityBuilder', desc);
    }
}

export const AssetToken = new InjectAssetActivityToken<IAssetActivity>('');
export const AssetBuilderToken = new InjectAssetActivityBuilderToken<IActivityBuilder>('')

