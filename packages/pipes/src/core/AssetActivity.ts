import { SourceActivity } from './SourceActivity';
import { DestActivity } from './DestActivity';
import { isArray } from '@ts-ioc/core';
import { ITransform } from './ITransform';
import { WatchActivity } from '@taskfr/node';
import { SourceMapsActivity } from './SourceMapsActivity';
import { UglifyActivity } from './UglifyActivity';
import { AnnotationActivity, AnnotationsConfigure } from './Annotation';
import { PipeActivity } from './PipeActivity';
import { IAssetActivity, AssetToken } from './AssetConfigure';
import { TestActivity } from './TestActivity';
import { AssetTask } from '../decorators';
import { PipeActivityContext } from './PipeActivityContext';


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
     * @param {PipeActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof AssetActivity
     */
    protected async beforePipe(ctx: PipeActivityContext): Promise<void> {
        if (this.test) {
            await this.test.run(ctx);
        }
        if (!(this.watch && ctx.watch === this.watch)) {
            await this.src.run(ctx);
            if (this.watch) {
                this.watch.body = this;
                let watchCtx = this.createCtx();
                watchCtx.watch = this.watch;
                watchCtx.target = this;
                this.watch.run(watchCtx);
            }
        }
        if (this.annotation) {
            await this.annotation.run(ctx);
        }
        if (this.sourcemaps) {
            ctx.sourceMaps = this.sourcemaps;
            await this.sourcemaps.init(ctx);
        }
    }

    /**
     * after pipe.
     *
     * @protected
     * @param {PipeActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof AssetActivity
     */
    protected async afterPipe(ctx: PipeActivityContext): Promise<void> {
        await this.executeUglify(ctx);
        if (isArray(this.dest)) {
            if (this.dest.length > 0) {
                await Promise.all(this.dest.map(ds => {
                    return this.executeDest(ds, ctx);
                }));
            }
        } else if (this.dest) {
            await this.executeDest(this.dest, ctx);
        }
    }

    /**
     * execute uglify.
     *
     * @protected
     * @param {PipeActivityContext} ctx
     * @returns
     * @memberof AssetActivity
     */
    protected async executeUglify(ctx: PipeActivityContext) {
        if (this.uglify) {
            await this.uglify.run(ctx);
        }
    }

    /**
     * execute dest activity.
     *
     * @protected
     * @param {DestActivity} ds
     * @param {PipeActivityContext} ctx
     * @returns
     * @memberof AssetActivity
     */
    protected async executeDest(ds: DestActivity, ctx: PipeActivityContext) {
        if (!ds) {
            return;
        }
        return await ds.run(ctx);
    }
}
