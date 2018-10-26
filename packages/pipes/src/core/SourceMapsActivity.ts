import { Activity, Task, OnActivityInit } from '@taskfr/core';
import * as sourcemaps from 'gulp-sourcemaps';
import { SourceMapsToken, ITransform, ISourceMapsActivity, SourceMapsConfigure, TransformActivityContext } from '@taskfr/node';

/**
 * source maps token.
 *
 * @export
 * @class SourceMapsActivity
 * @extends {Activity<ITransform>}
 * @implements {OnActivityInit}
 */
@Task(SourceMapsToken)
export class SourceMapsActivity extends Activity<ITransform> implements ISourceMapsActivity {
    sourcemaps: string;

    async onActivityInit(config: SourceMapsConfigure) {
        await super.onActivityInit(config);
        this.sourcemaps = this.context.to(config.sourcemaps) || './sourcemaps';
    }

    private hasInit = false;

    protected async execute(ctx: TransformActivityContext) {
        if (!this.hasInit) {
            ctx.data = ctx.data.pipe(sourcemaps.init());
        } else {
            ctx.data = ctx.data.pipe(sourcemaps.write(this.sourcemaps));
        }
    }

    async init(ctx: TransformActivityContext) {
        this.hasInit = false;
        await this.run(ctx);
        this.hasInit = true;
    }

    async write(ctx: TransformActivityContext) {
        if (this.hasInit) {
            return;
        }
        await this.run(ctx);
    }
}
