import { CtxType, ActivityConfigure, InjectAcitityToken, GActivity, Task } from '@taskfr/core';
import { ITransform } from './ITransform';
import { TransformActivityContext, TransformActivityContextToken } from './TransformActivityContext';
import { NodeActivity } from '../core';

/**
 * source map configure
 *
 * @export
 * @interface SourceMapsConfigure
 * @extends {ActivityConfigure}
 */
export interface SourceMapsConfigure extends ActivityConfigure {
    /**
     * sourcemaps.
     */
    sourcemaps?: CtxType<string>;
}

/**
 * source map activity.
 *
 * @export
 * @interface ISourceMapsActivity
 * @extends {GActivity<ITransform>}
 */
export interface ISourceMapsActivity extends GActivity<ITransform> {
    sourcemaps: string;
}

/**
 * source maps token.
 */
export const SourceMapsToken = new InjectAcitityToken<ISourceMapsActivity>('sourcemaps');



/**
 * source maps token.
 *
 * @export
 * @class SourceMapsActivity
 * @extends {Activity<ITransform>}
 * @implements {OnActivityInit}
 */
@Task(SourceMapsToken, TransformActivityContextToken)
export class SourceMapsActivity extends NodeActivity implements ISourceMapsActivity {
    sourcemaps: string;

    async onActivityInit(config: SourceMapsConfigure) {
        await super.onActivityInit(config);
        this.sourcemaps = this.context.to(config.sourcemaps) || './sourcemaps';
    }

    private hasInit = false;

    protected async execute(ctx: TransformActivityContext) {
        const sourcemaps = require('gulp-sourcemaps');
        if (!sourcemaps) {
            console.error('not found gulp-sourcemaps');
            return;
        }
        if (!this.hasInit) {
            ctx.result = ctx.result.pipe(sourcemaps.init());
        } else {
            ctx.result = ctx.result.pipe(sourcemaps.write(this.sourcemaps));
        }
    }

    async init(ctx: TransformActivityContext) {
        this.hasInit = false;
        await this.run(ctx);
        this.hasInit = true;
    }

    async write(ctx: TransformActivityContext) {
        if (!this.hasInit) {
            return;
        }
        await this.run(ctx);
    }
}
