import { src, SrcOptions } from 'vinyl-fs';
import { IPipeComponent } from './IPipeComponent';
import { PipeComponent } from './PipeComponent';
import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { Src, OnTaskInit } from '@taskp/core';
import { ISourceConfigure } from './IPipeConfigure';



/**
 * source provider.
 *
 * @export
 * @interface IPipeSource
 * @extends {IPipeComponent}
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
export class PipeSource extends PipeComponent<IPipeComponent> implements IPipeSource, OnTaskInit {


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

    onTaskInit() {
        let cfg = this.config as ISourceConfigure;
        this.src = this.context.to(cfg.src);
        this.srcOptions  = this.context.to(cfg.srcOptions);
    }

    protected source(): Promise<ITransform> {
        return Promise.resolve(src(this.src, this.srcOptions));
    }

    protected async merge(...data: ITransform[]): Promise<ITransform> {
        let newTransform = await this.source();
        data = data || [];
        data.unshift(newTransform);
        return await super.merge(...data);
    }
}
