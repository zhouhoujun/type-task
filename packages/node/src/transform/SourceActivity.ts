import { src, SrcOptions } from 'vinyl-fs';
import { Src, Expression, ExpressionType, Task } from '@taskfr/core';
import { InjectTransformActivityToken } from './ITransformActivity';
import { ITransformConfigure } from './ITransformConfigure';
import { TransformActivity } from './TransformActivity';
import { TransformActivityContext } from './TransformActivityContext';
import { ITransform } from './ITransform';

/**
 * source activity token.
 */
export const SourceAcitvityToken = new InjectTransformActivityToken<SourceActivity>('source');

/**
 * source pipe configure.
 *
 * @export
 * @interface ITransformSourceConfigure
 * @extends {ITransformConfigure}
 */
export interface SourceConfigure extends ITransformConfigure {
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
@Task(SourceAcitvityToken)
export class SourceActivity extends TransformActivity {
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

    /**
     * begin pipe.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof TransformActivity
     */
    protected async beforeTransform(ctx: TransformActivityContext): Promise<void> {
        let src = await this.context.exec(this, this.src, ctx);
        let srcOptions = await this.context.exec(this, this.srcOptions, ctx);
        ctx.input = src;
        ctx.data = this.source(src, srcOptions);
    }

    source(source: Src, srcOptions: SrcOptions): ITransform {
        return src(source, srcOptions);
    }
}
