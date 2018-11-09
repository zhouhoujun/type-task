import { SrcOptions } from 'vinyl-fs';
import { Src, Expression, ExpressionType, Task, InjectAcitityToken, ActivityConfigure } from '@taskfr/core';
import { TransformActivityContext, TransformActivityContextToken } from './TransformActivityContext';
import { NodeActivity } from '../core';
import { isArray, isString } from '@ts-ioc/core';

/**
 * source activity token.
 */
export const SourceAcitvityToken = new InjectAcitityToken<SourceActivity>('source');

/**
 * source pipe configure.
 *
 * @export
 * @interface ITransformSourceConfigure
 * @extends {ITransformConfigure}
 */
export interface SourceConfigure extends ActivityConfigure {
    /**
     * transform source.
     *
     * @type {TransformSource}
     * @memberof ITransformConfigure
     */
    src: ExpressionType<Src>;

    /**
     * src options.
     *
     * @type {CtxType<SrcOptions>}
     * @memberof ITransformConfigure
     */
    srcOptions?: ExpressionType<SrcOptions>;
}

/**
 * Source activity.
 *
 * @export
 * @class SourceActivity
 * @extends {TransformActivity}
 */
@Task(SourceAcitvityToken, TransformActivityContextToken)
export class SourceActivity extends NodeActivity {
    /**
     * source
     *
     * @type {TransformSource}
     * @memberof ITransformSource
     */
    src: Expression<Src>;

    /**
     * source options.
     *
     * @type {SrcOptions}
     * @memberof TransformSource
     */
    srcOptions: Expression<SrcOptions>;

    async onActivityInit(config: SourceConfigure) {
        await super.onActivityInit(config);
        this.src = await this.toExpression(config.src);

        if (config.srcOptions) {
            this.srcOptions = await this.toExpression(config.srcOptions)
        }
    }

    getContext(): TransformActivityContext {
        return super.getContext() as TransformActivityContext;
    }

    protected async execute() {

    }

    /**
     * create activity context.
     *
     * @protected
     * @param {*} [ctx]
     * @memberof PipeActivity
     */
    protected verifyCtx(ctx?: any) {
        if (isString(this.src) || (isArray(this.src) && this.src.length)) {
            this.getContext().setAsResult(ctx);
        } else if (ctx instanceof TransformActivityContext) {
            this._ctx = ctx;
        } else {
            this.getContext().setAsResult(ctx);
        }
    }
}
