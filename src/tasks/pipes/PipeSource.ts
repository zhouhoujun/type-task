import { Task, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { Src } from '../../utils/index';
import { ITransform } from './ITransform';
import { isFunction, isString, isArray } from 'tsioc';
import { ITaskContext } from '../../ITaskContext';
import { src, SrcOptions } from 'vinyl-fs';
import { PipeComponent } from './PipeComponent';
import { IPipeComponent } from './IPipeComponent';
import { TransformSource, TransformMerger } from './pipeTypes';
import { IPipeComponentProvider } from '.';

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

    protected mergeTransforms(data: ITransform | ITransform[]): Promise<ITransform> {
        let newTransform = this.source();
        if (data) {
            let transforms = isArray(data) ? data : [data];
            transforms.push(newTransform);
            return super.mergeTransforms(transforms);
        } else {
            return Promise.resolve(newTransform);
        }
    }

    protected pipe(transform: ITransform): Promise<ITransform> {
        return Promise.resolve(transform);
    }
}
