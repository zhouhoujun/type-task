import { isArray } from '@ts-ioc/core';
import { WatchActivity, TestActivity, TransformActivity, TransformActivityContext, SourceActivity, DestActivity, SourceMapsActivity } from '@taskfr/node';
import { UglifyActivity } from './UglifyActivity';
import { AnnotationActivity, AnnotationsConfigure } from './Annotation';
import { IAssetActivity, AssetToken } from './IAssetActivity';
import { Asset } from '../decorators';



/**
 * Asset Activity
 *
 * @export
 * @class AssetActivity
 * @extends {TaskElement}
 * @implements {IAssetActivity}
 */
@Asset(AssetToken)
export class AssetActivity extends TransformActivity implements IAssetActivity {
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
     * @param {TransformActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof AssetActivity
     */
    protected async beforePipe(ctx: TransformActivityContext): Promise<void> {
        if (this.test) {
            await this.test.run(ctx);
        }
        if (!(this.watch && ctx.target === this.watch)) {
            await this.src.run(ctx);
            if (this.watch) {
                this.watch.body = this;
                let watchCtx = this.verifyCtx();
                watchCtx.target = this.watch;
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
     * @param {TransformActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof AssetActivity
     */
    protected async afterPipe(ctx: TransformActivityContext): Promise<void> {
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
     * @param {TransformActivityContext} ctx
     * @returns
     * @memberof AssetActivity
     */
    protected async executeUglify(ctx: TransformActivityContext) {
        if (this.uglify) {
            await this.uglify.run(ctx);
        }
    }

    /**
     * execute dest activity.
     *
     * @protected
     * @param {DestActivity} ds
     * @param {TransformActivityContext} ctx
     * @returns
     * @memberof AssetActivity
     */
    protected async executeDest(ds: DestActivity, ctx: TransformActivityContext) {
        if (!ds) {
            return;
        }
        return await ds.run(ctx);
    }
}
