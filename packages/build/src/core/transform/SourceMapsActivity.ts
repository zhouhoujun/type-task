import { CtxType, ActivityConfigure, InjectAcitityToken, GActivity, Task } from '@taskfr/core';
import { ITransform } from './ITransform';
import { TransformActivityContext, TransformActivityContextToken } from './TransformActivityContext';
import { NodeActivity } from '@taskfr/node';


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

    private hasInit = false;

    async onActivityInit(config: SourceMapsConfigure) {
        await super.onActivityInit(config);
        this.sourcemaps = this.getContext().to(config.sourcemaps) || './sourcemaps';
    }

    getContext(): TransformActivityContext {
        return super.getContext() as TransformActivityContext;
    }

    protected verifyCtx(ctx?: any) {
        if (ctx instanceof TransformActivityContext) {
            this._ctx = ctx;
        } else {
            this.getContext().setAsResult(ctx);
        }
    }

    protected async execute() {
        const sourcemaps = require('gulp-sourcemaps');
        if (!sourcemaps) {
            console.error('not found gulp-sourcemaps');
            return;
        }
        let ctx = this.getContext();
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
