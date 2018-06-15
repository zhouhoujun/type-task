import { src, SrcOptions } from 'vinyl-fs';
import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { Src, OnTaskInit } from '@taskp/core';
import { ISourceConfigure } from './IPipeConfigure';
import { IPipeTask } from './IPipeTask';
import { AbstractPipe } from './AbstractPipe';



/**
 * source provider.
 *
 * @export
 * @interface IPipeSource
 * @extends {IPipeTask}
 */
export interface IPipeSource extends IPipeTask {
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
export class PipeSource extends AbstractPipe implements IPipeSource, OnTaskInit {


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

    run(): Promise<ITransform> {
        return Promise.resolve(src(this.src, this.srcOptions));
    }

}
