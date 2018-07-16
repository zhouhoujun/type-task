import { src, SrcOptions } from 'vinyl-fs';
import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { Src, IActivity, Expression, ActivityResultType } from '@taskfr/core';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeActivity } from './PipeActivity';
import { InjectPipeActivityToken, InjectPipeAcitityBuilderToken } from './IPipeActivity';
import { Singleton } from '@ts-ioc/core';
import { PipeActivityBuilder } from './PipeActivityBuilder';


export const SourceAcitvityToken = new InjectPipeActivityToken<SourceActivity>('source');

export const SourceAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<SourceActivityBuilder>('source')
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
    src: Expression<Src> | ActivityResultType<Src>;

    /**
     * src options.
     *
     * @type {CtxType<SrcOptions>}
     * @memberof IPipeConfigure
     */
    srcOptions?: Expression<SrcOptions> | ActivityResultType<SrcOptions>;
}

@PipeTask(SourceAcitvityToken, SourceAcitvityBuilderToken)
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

@Singleton(SourceAcitvityBuilderToken)
export class SourceActivityBuilder extends PipeActivityBuilder {

    async buildStrategy(activity: IActivity<any>, config: SourceConfigure): Promise<IActivity<any>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof SourceActivity) {

            activity.src = await this.toExpression(config.src, activity);

            if (config.srcOptions) {
                activity.srcOptions = await this.toExpression(config.srcOptions, activity)
            }
        }
        return activity;
    }
}
