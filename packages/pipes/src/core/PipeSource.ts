import { src, SrcOptions } from 'vinyl-fs';
import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { Src, OnTaskInit } from '@taskp/core';
import { ISourceConfigure } from './IPipeConfigure';
import { PipeComponent } from './PipeComponent';
import { IPipeComponent } from './IPipeComponent';



/**
 * source provider.
 *
 * @export
 * @interface IPipeSource
 * @extends {IPipeTask}
 */
export interface IPipeSource extends IPipeComponent {
    /**
     * source
     *
     * @type {TransformSource}
     * @memberof IPipeSource
     */
    src?: Src;
    /**
     * source options.
     *
     * @type {SrcOptions}
     * @memberof IPipeSource
     */
    srcOptions?: SrcOptions;
}

@PipeTask
export class PipeSource extends PipeComponent<IPipeSource> implements IPipeSource, OnTaskInit {


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


    constructor(name?: string) {
        super(name);
    }

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
