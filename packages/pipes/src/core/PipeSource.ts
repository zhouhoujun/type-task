import { src, SrcOptions } from 'vinyl-fs';
import { ITransform } from '../ITransform';
import { PipeTask } from '../decorators';
import { Src, OnTaskInit } from '@taskfr/core';
import { ISourceConfigure } from './IPipeConfigure';
import { PipeToken, IPipeActivity } from '../IPipeTask';
import { Registration } from '@ts-ioc/core';
import { PipeElement } from './PipeElement';


export const SourceToken = new Registration<IPipeActivity>(PipeToken, '@taskfr/core');


/**
 * source provider.
 *
 * @export
 * @interface IPipeSource
 * @extends {IPipeActivity}
 */
export interface IPipeSource extends IPipeActivity {
    /**
     * source
     *
     * @type {TransformSource}
     * @memberof IPipeSource
     */
    src: Src;
    /**
     * source options.
     *
     * @type {SrcOptions}
     * @memberof IPipeSource
     */
    srcOptions?: SrcOptions;
}

@PipeTask(SourceToken)
export class PipeSource extends PipeElement implements IPipeSource, OnTaskInit {
    /**
     * source
     *
     * @type {TransformSource}
     * @memberof IPipeSource
     */
    src: Src;

    /**
     * source options.
     *
     * @type {SrcOptions}
     * @memberof PipeSource
     */
    srcOptions: SrcOptions;

    onTaskInit(config: ISourceConfigure) {
        this.src = this.context.to(config.src);
        this.srcOptions = this.context.to(config.srcOptions);
    }

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
