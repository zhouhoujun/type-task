import { Task, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { Src } from '../../utils/index';
import { ITransform } from './ITransform';
import { isFunction, isString, isArray } from 'tsioc';
import { ITaskContext } from '../../ITaskContext';
import { src, SrcOptions } from 'vinyl-fs';
import { PipeComponent } from './PipeComponent';
import { IPipeComponent, IPipeComponentProvider } from './IPipeComponent';
import { TransformSource, TransformMerger } from './pipeTypes';
import { Observable } from 'rxjs/Observable';

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

    pipe(transform: ITransform): Observable<ITransform> {
        // console.log('********** source pipe ************');
        return Observable.of(transform, this.getScheduler());
    }

    protected source(): Observable<ITransform> {
        let source = isFunction(this.src) ? this.src(this.context, this.getConfig()) : this.src;
        return Observable.of(src(source, this.options), this.getScheduler());
    }

    protected merge(data: ITransform | ITransform[]): Observable<ITransform> {
        let newTransform = this.source();
        if (data) {
            newTransform = newTransform.flatMap(source => {
                let transforms = isArray(data) ? data : [data];
                transforms.push(source);
                return super.merge(transforms);
            });
        }
        return newTransform;
    }
}
