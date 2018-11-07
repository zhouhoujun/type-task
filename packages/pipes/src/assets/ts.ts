import { Asset } from '../decorators';
import { AssetConfigure, AssetActivity } from '../core';
import { isBoolean, ObjectMap, isString } from '@ts-ioc/core';
import { classAnnotations } from '@ts-ioc/annotations';
import * as ts from 'gulp-typescript';
import { CtxType, OnActivityInit } from '@taskfr/core';
import { AnnotationActivity } from '../core/Annotation';
import { DestActivity, DestAcitvityToken, TransformActivityContext, ITransform, isTransform } from '@taskfr/node'


/**
 * ts task configure.
 *
 * @export
 * @interface TsConfigure
 * @extends {AssetConfigure}
 */
export interface TsConfigure extends AssetConfigure {
    /**
     * tds config.
     *
     * @type {(CtxType<boolean | string>)}
     * @memberof TsConfigure
     */
    tds?: CtxType<boolean | string>;

    /**
     * set tsconfig to compile.
     *
     * @type {(CtxType<string | ObjectMap<any>>)}
     * @memberof TsConfigure
     */
    tsconfig?: CtxType<string | ObjectMap<any>>;
}

@Asset('ts')
export class TsCompile extends AssetActivity implements OnActivityInit {

    tdsDest: DestActivity | boolean;
    /**
     * on task init.
     *
     * @param {TsConfigure} cfg
     * @memberof TsCompile
     */
    async onActivityInit(cfg: TsConfigure) {
        await super.onActivityInit(cfg);
        this.defaultAnnotation = { annotationFramework: () => classAnnotations(), task: AnnotationActivity };
        let tds = this.context.to(cfg.tds);
        if (tds !== false) {
            if (isString(tds)) {
                this.tdsDest = this.context.getContainer().resolve(DestAcitvityToken);
                this.tdsDest.dest = tds;
            } else {
                this.tdsDest = true;
            }
        }
        if (!cfg.sourcemaps && cfg.sourcemaps !== false) {
            cfg.sourcemaps = true;
        }
    }

    /**
     * execute ts pipe.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof TsCompile
     */
    protected async pipe(ctx: TransformActivityContext): Promise<void> {
        ctx.result.js = await this.pipeStream(ctx.result.js, ctx, ...this.pipes);
    }
    /**
     * begin pipe.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof TsCompile
     */
    protected async beforePipe(ctx: TransformActivityContext): Promise<void> {
        await super.beforePipe(ctx);
        ctx.result = await this.pipeStream(ctx.result, ctx, this.getTsCompilePipe());
    }
    /**
     * get ts configue compile.
     *
     * @private
     * @returns {ITransform}
     * @memberof TsCompile
     */
    private getTsCompilePipe(): ITransform {
        let cfg = this.config as TsConfigure;
        let tsconfig = this.context.to(cfg.tsconfig || './tsconfig.json');
        if (isString(tsconfig)) {
            let tsProject = ts.createProject(this.context.toRootPath(tsconfig));
            return tsProject();
        } else {
            return ts(tsconfig);
        }
    }
    /**
     * execyte uglify.
     *
     * @protected
     * @param {ITransform} stream
     * @returns
     * @memberof TsCompile
     */
    protected async executeUglify(ctx: TransformActivityContext) {
        if (this.uglify) {
            let ugCtx = this.ctxFactory.create<TransformActivityContext>(ctx.result.js);
            ctx.result.js = await this.uglify.run(ugCtx);
        }
    }
    /**
     * execute dest activity.
     *
     * @protected
     * @param {DestActivity} ds
     * @param {ctx} TransformActivityContext
     * @returns
     * @memberof TsCompile
     */
    protected async executeDest(ds: DestActivity, ctx: TransformActivityContext) {
        if (!ds || !ctx.result) {
            return;
        }

        let stream = ctx.result;
        if (this.tdsDest && isTransform(stream.dts)) {
            let dts = isBoolean(this.tdsDest) ? ds : (this.tdsDest || ds);
            await dts.run(this.ctxFactory.create<TransformActivityContext>(stream.dts));
        }
        if (isTransform(stream.js)) {
            let jsCtx = this.ctxFactory.create<TransformActivityContext>(stream.js);
            jsCtx.sourceMaps = ctx.sourceMaps;
            await ds.run(jsCtx);
        } else if (isTransform(stream)) {
            let newCtx = this.ctxFactory.create<TransformActivityContext>(stream);
            newCtx.sourceMaps = ctx.sourceMaps;
            await ds.run(newCtx);
        }
    }
}
