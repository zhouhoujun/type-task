import { Src, Task, ITaskProvider, RunWay, AbstractTask } from '@taskp/core';
import { ITransform } from './ITransform';
import { isFunction, isString, isArray, Mode } from '@ts-ioc/core';
import { src, SrcOptions } from 'vinyl-fs';
import { PipeComponent } from './PipeComponent';
import { IPipeComponent } from './IPipeComponent';
import { TransformMerger, TransformType } from './pipeTypes';


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

@Task
export class PipeSource extends PipeComponent<IPipeComponent> implements IPipeSource {

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
     * @memberof PipeSource
     */
    srcOptions: SrcOptions;


    constructor(name?: string) {
        super(name);
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
