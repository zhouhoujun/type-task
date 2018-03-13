import { Task, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { Src } from '../../utils/index';
import { ITransform } from './ITransform';
import { isFunction, isString, isArray } from 'tsioc';
import { ITaskContext } from '../../ITaskContext';
import { src, SrcOptions } from 'vinyl-fs';
import { PipeComponent } from './PipeComponent';
import { IPipeComponent } from './IPipeComponent';
import { TransformSource, TransformMerger, TransformReference } from './pipeTypes';

@Task
export class PipeSource extends PipeComponent<IPipeComponent> implements IPipeComponent {

    constructor(name: string, runWay = RunWay.paraLast, protected src: TransformSource, merger?: TransformMerger, reference?: TransformReference, protected options?: SrcOptions) {
        super(name, runWay, merger, reference);
        this.options = Object.assign({ allowEmpty: true }, this.options || {});
    }

    protected source(): ITransform {
        let source = isFunction(this.src) ? this.src(this.context, this.getConfig()) : this.src;
        return src(source, this.options);
    }

    protected mergeTransforms(data: ITransform | ITransform[]): ITransform {
        let newTransform = this.source();
        let merger = this.getMerger();
        if (data && merger) {
            let transforms = isArray(data) ? data : [data];
            transforms.push(newTransform);
            return merger.merge(transforms);
        } else {
            return newTransform;
        }
    }

    protected pipe(transform: ITransform): Promise<ITransform> {
        return Promise.resolve(transform);
    }
}
