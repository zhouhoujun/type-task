import { SourceActivity } from './SourceActivity';
import { DestActivity } from './DestActivity';
import { isArray } from '@ts-ioc/core';
import { ITransform } from './ITransform';
import { WatchActivity } from './WatchActivity';
import { SourceMapsActivity } from './SourceMapsActivity';
import { UglifyActivity } from './UglifyActivity';
import { AnnotationActivity, AnnotationsConfigure } from './Annotation';
import { PipeActivity } from './PipeActivity';
import { IActivity } from '@taskfr/core';
import { IAssetActivity, AssetToken } from './AssetConfigure';
import { TestActivity } from './TestActivity';
import { AssetTask } from '../decorators';


/**
 * Asset Activity
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@AssetTask(AssetToken)
export class AssetActivity extends PipeActivity implements IAssetActivity {
    /**
     * src activity.
     *
     * @type {SourceActivity}
     * @memberof AssetActivity
     */
    src: SourceActivity;

    /**
     * test activity.
     *
     * @type {TestActivity}
     * @memberof AssetActivity
     */
    test: TestActivity;

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
     * @type {AnnotationsConfigure}
     * @memberof AssetActivity
     */
    defaultAnnotation?: AnnotationsConfigure;

    /**
     * before pipe
     *
     * @protected
     * @param {ITransform} stream
     * @param {IActivity} [execute]
     * @returns {Promise<ITransform>}
     * @memberof AssetActivity
     */
    protected async beforePipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        if (this.test) {
            await this.test.run(stream);
        }
        let source: ITransform;
        if (execute && execute === this.watch) {
            source = stream;
        } else {
            source = await this.src.run(stream);
            if (this.watch) {
                this.watch.run(stream, this);
            }
        }
        if (this.annotation) {
            source = await this.annotation.run(source);
        }
        if (this.sourcemaps) {
            source = await this.sourcemaps.init(source);
        }
        return source;
    }

    /**
     * after pipe.
     *
     * @protected
     * @param {ITransform} stream
     * @param {IActivity} [execute]
     * @returns {Promise<ITransform>}
     * @memberof AssetActivity
     */
    protected async afterPipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        stream = await this.executeUglify(stream);
        if (isArray(this.dest)) {
            if (this.dest.length === 1) {
                await this.executeDest(this.dest[0], stream);
            } else if (this.dest.length > 0) {
                await Promise.all(this.dest.map(ds => {
                    return this.executeDest(ds, stream);
                }));
            }
        } else if (this.dest) {
            await this.executeDest(this.dest, stream);
        }
        return stream;
    }

    /**
     * execute uglify.
     *
     * @protected
     * @param {ITransform} stream
     * @returns
     * @memberof AssetActivity
     */
    protected async executeUglify(stream: ITransform) {
        if (this.uglify) {
            stream = await this.uglify.run(stream);
        }
        return stream;
    }

    /**
     * execute dest activity.
     *
     * @protected
     * @param {DestActivity} ds
     * @param {ITransform} stream
     * @returns
     * @memberof AssetActivity
     */
    protected async executeDest(ds: DestActivity, stream: ITransform) {
        if (!ds) {
            return null;
        }
        return ds.run(stream, this.sourcemaps);
    }
}
