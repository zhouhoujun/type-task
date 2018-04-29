import { Src, Task, ITaskProvider, ITaskContext, RunWay, AbstractTask } from '@taskp/core';
import {  } from '../../utils/index';
import { ITransform } from './ITransform';
import { isFunction, isString, isArray } from '@ts-ioc/core';
import { src, SrcOptions } from 'vinyl-fs';
import { PipeComponent } from './PipeComponent';
import { IPipeComponent, IPipeComponentProvider } from './IPipeComponent';
import { TransformSource, TransformMerger } from './pipeTypes';

/**
 * source provider.
 *
 * @export
 * @interface IPipeSourceProvider
 * @extends {IPipeComponentProvider}
 */
export interface IPipeSourceProvider extends IPipeComponentProvider {
    /**
     * source
     *
     * @type {TransformSource}
     * @memberof IPipeSourceProvider
     */
    src?: TransformSource;
    /**
     * source options.
     *
     * @type {SrcOptions}
     * @memberof IPipeSourceProvider
     */
    options?: SrcOptions;
}

@Task
export class PipeSource extends PipeComponent<IPipeComponent> implements IPipeComponent {

    constructor(name: string, runWay = RunWay.paraLast, protected src: TransformSource, merger?: TransformMerger, protected options?: SrcOptions) {
        super(name, runWay, merger);
        this.options = Object.assign({ allowEmpty: true }, this.options || {});
    }

    protected source(): ITransform {
        let source = isFunction(this.src) ? this.src(this.context, this.getConfig()) : this.src;
        return src(source, this.options);
    }

    protected merge(data: ITransform[]): Promise<ITransform> {
        let newTransform = this.source();
        data = data || [];
        data.unshift(newTransform);
        return super.merge(data);
    }

    protected pipe(transform: ITransform): Promise<ITransform> {
        return Promise.resolve(transform);
    }
}
