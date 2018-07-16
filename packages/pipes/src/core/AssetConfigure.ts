import { Src, ExpressionType, ActivityResultType, ActivityType, IActivityBuilder, IActivityConfigure } from '@taskfr/core';
import { ObjectMap, Registration } from '@ts-ioc/core';
import { DestConfigure, DestActivity } from './DestActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { SourceActivity } from './SourceActivity';
import { WatchActivity } from './WatchActivity';
import { SourceMapsActivity } from './SourceMapsActivity';
import { AnnotationActivity } from './Annotation';
import { IPipeActivity } from './IPipeActivity';
import { UglifyActivity } from './UglifyActivity';

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
     * @type {(ExpressionType<string | boolean> | ActivityType<AnnotationActivity>)}
     * @memberof AssetConfigure
     */
    annotation?: ExpressionType<string | boolean> | ActivityType<AnnotationActivity>;

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

