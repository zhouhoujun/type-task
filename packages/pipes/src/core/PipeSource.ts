import { src, SrcOptions } from 'vinyl-fs';
import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { Src, CtxType, IActivity, Expression } from '@taskfr/core';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeActivity } from './PipeActivity';
import { InjectPipeActivityToken } from './IPipeActivity';
import { Singleton } from '@ts-ioc/core';
import { PipeActivityBuilder, InjectPipeAcitityBuilderToken } from './PipeActivityBuilder';


export const SourceAcitvityToken = new InjectPipeActivityToken<PipeSourceActivity>('source');

export const SourceAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<PipeSourceActivityBuilder>('source')
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
    src?: Expression<Src>;

    /**
     * src options.
     *
     * @type {CtxType<SrcOptions>}
     * @memberof IPipeConfigure
     */
    srcOptions?: Expression<SrcOptions>;
}

@PipeTask(SourceAcitvityToken, SourceAcitvityBuilderToken)
export class PipeSourceActivity extends PipeActivity {
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

    protected merge(...data: ITransform[]): Promise<ITransform> {
        if (!this.merger) {
            return Promise.resolve(this.source());
        } else {
            data.unshift(this.source());
            return super.merge(...data);
        }
    }

    source(): ITransform {
        return src(this.src, this.srcOptions);
    }
}

@Singleton(SourceAcitvityBuilderToken)
export class PipeSourceActivityBuilder extends PipeActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: SourceConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof PipeSourceActivity) {
            activity.src = activity.context.to(config.src);
            activity.srcOptions = activity.context.to(config.srcOptions);
        }
        return activity;
    }
}
