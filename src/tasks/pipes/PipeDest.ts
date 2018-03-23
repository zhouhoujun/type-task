import { Task, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { TransformSource, DestExpress, TransformExpress, TransformMerger } from './pipeTypes';
import { isArray, Abstract, isFunction, ObjectMap, isClass } from 'tsioc';
import { ITransform } from './ITransform';
import { IPipeComponentProvider, IPipeComponent } from './IPipeComponent';
import { ITaskContext } from '../../ITaskContext';
import { Src } from '../../utils/index';
import { PipeComponent } from './PipeComponent';
import { DestOptions, dest } from 'vinyl-fs';
import { Observable } from 'rxjs/Observable';


/**
 * pipe dest provider.
 *
 * @export
 * @interface IPipeDestProvider
 * @extends {IPipeComponentProvider}
 */
export interface IPipeDestProvider extends IPipeComponentProvider {
    /**
     * dest source.
     *
     * @type {TransformSource}
     * @memberof IPipeDestProvider
     */
    dest?: TransformSource;
    /**
     * dest pipes.
     *
     * @type {DestExpress}
     * @memberof IPipeDestProvider
     */
    destPipes?: DestExpress;
    /**
     * source options.
     *
     * @type {DestOptions}
     * @memberof IPipeDestProvider
     */
    options?: DestOptions;
}

@Task
export class PipeDest extends PipeComponent<IPipeComponent> implements IPipeComponent {

    constructor(name: string, runWay = RunWay.seqFirst, protected dest: TransformSource, protected destPipes?: DestExpress, merger?: TransformMerger, protected options?: DestOptions) {
        super(name, runWay, merger);
    }

    pipe(transform: ITransform): Observable<ITransform> {
        let dest = isFunction(this.dest) ? this.dest(this.context, this.getConfig()) : this.dest;

        if (isArray(dest)) {
            if (dest.length) {
                return Observable.forkJoin(dest.map(dist => this.writeStream(transform, dist)))
                    .map(() => {
                        return transform;
                    });
            } else {
                return Observable.of(transform);
            }
        } else {
            return this.writeStream(transform, dest)
        }
    }

    protected writeStream(stream: ITransform, dist: string): Observable<ITransform> {
        return this.destPipesToObs(stream)
            .flatMap(streams => {
                let transforms = isArray(streams) ? streams : [streams];
                return Promise.all(transforms.map(transform => {
                    let output = transform.pipe(dest(this.context.toRootPath(dist), this.options));
                    if (!output) {
                        return null;
                    }

                    return new Promise((resolve, reject) => {
                        output
                            .once('end', () => {
                                resolve();
                            })
                            .once('error', reject);

                    }).then(() => {
                        output.removeAllListeners('error');
                        output.removeAllListeners('end');
                        return output;
                    }, err => {
                        output.removeAllListeners('error');
                        output.removeAllListeners('end');
                        process.exit(1);
                        return err;
                    });
                }))
                    .then(pipes => {
                        return stream;
                    });
            });
    }

    protected destPipesToObs(stream: ITransform): Observable<ITransform | ITransform[]> {
        if (this.destPipes) {
            if (isArray(this.destPipes) || isFunction(this.destPipes)) {
                return this.pipeToObs(stream, this.destPipes);
            } else {
                let keys = Object.keys(this.destPipes).filter(key => key !== 'constructor');
                if (keys.length) {
                    return Observable.forkJoin(keys.map(key => {
                        return this.pipeToObs(stream, this.destPipes[key]);
                    }));
                }
            }
        }

        return Observable.of(stream);
    }

}
