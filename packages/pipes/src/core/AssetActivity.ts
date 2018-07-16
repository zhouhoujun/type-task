import { AssetTask } from '../decorators/AssetTask';
import { SourceActivity } from './SourceActivity';
import { DestActivity } from './DestActivity';
import { isArray } from '@ts-ioc/core';
import { ITransform } from './ITransform';
import { WatchActivity } from './WatchActivity';
import { SourceMapsActivity } from './SourceMapsActivity';
import { UglifyActivity } from './UglifyActivity';
import { AnnotationActivity } from './Annotation';
import { PipeActivity } from './PipeActivity';
import { IActivityConfigure, IActivity } from '@taskfr/core';
import { IAssetActivity } from './AssetConfigure';


/**
 * Asset Activity
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@AssetTask
export class AssetActivity extends PipeActivity implements IAssetActivity {

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

    protected async beginPipe(data?: any, execute?: IActivity<any>): Promise<ITransform> {
        let source = await this.src.run(data);
        if (this.annotation) {
            source = await this.annotation.run(source);
        }
        if (this.sourcemaps) {
            source = await this.sourcemaps.init(source);
        }
        return source;
    }

    protected async endPipe(data?: ITransform, execute?: IActivity<any>): Promise<ITransform> {
        if (isArray(this.dest)) {
            if (this.dest.length === 1) {
                await this.dest[0].run(data, this.sourcemaps);
            } else if (this.dest.length > 0) {
                await Promise.all(this.dest.map(ds => {
                    return this.executeDest(ds, data);
                }));
            }
        } else if (this.dest) {
            await this.executeDest(this.dest, data);
        }
        return data;
    }

    protected async executeDest(ds: DestActivity, data: ITransform) {
        if (!ds) {
            return null;
        }
        return ds.run(data, this.sourcemaps);
    }
}
