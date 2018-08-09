import { src, SrcOptions } from 'vinyl-fs';
import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { Src, Expression, ExpressionType } from '@taskfr/core';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeActivity } from './PipeActivity';
import { InjectPipeActivityToken } from './IPipeActivity';


export const SourceAcitvityToken = new InjectPipeActivityToken<SourceActivity>('source');

/**
 * source pipe configure.
 *
 * @export
 * @interface IPipeSourceConfigure
 * @extends {IPipeConfigure}
 */
export interface SourceConfigure extends IPipeConfigure {
    /**
     * transform source.
     *
     * @type {TransformSource}
     * @memberof IPipeConfigure
     */
    src: ExpressionType<Src>;

    /**
     * src options.
     *
     * @type {CtxType<SrcOptions>}
     * @memberof IPipeConfigure
     */
    srcOptions?: ExpressionType<SrcOptions>;
}

@PipeTask(SourceAcitvityToken)
export class SourceActivity extends PipeActivity {
    /**
     * source
     *
     * @type {TransformSource}
     * @memberof IPipeSource
     */
    src: Expression<Src>;

    /**
     * source options.
     *
     * @type {SrcOptions}
     * @memberof PipeSource
     */
    srcOptions: Expression<SrcOptions>;

    async onActivityInit(config: SourceConfigure) {
        await super.onActivityInit(config);
        this.src = await this.toExpression(config.src);

        if (config.srcOptions) {
            this.srcOptions = await this.toExpression(config.srcOptions)
        }
    }

    protected async merge(...data: ITransform[]): Promise<ITransform> {
        let src = await this.context.exec(this, this.src, data);
        let srcOptions = await this.context.exec(this, this.srcOptions, data);
        if (!this.merger) {
            return this.source(src, srcOptions);
        } else {
            data.unshift(this.source(src, srcOptions));
            return await super.merge(...data);
        }
    }

    source(source: Src, srcOptions: SrcOptions): ITransform {
        return src(source, srcOptions);
    }
}
