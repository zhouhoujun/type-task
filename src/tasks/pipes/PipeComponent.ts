import { Task, ITask, ITaskOption, RunWay, IBuilder, ITaskComponent, TaskComponent, ITaskProvider, IConfigure, TaskModule } from '../../core/index';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { Abstract, isArray, isClass, isFunction, IContainer, getTypeMetadata, isPromise } from 'tsioc';
import { TransformMerger, TransformExpress, TransformType } from './pipeTypes';
import { ITransformMerger } from './ITransformMerger';
import { IPipeTask } from './IPipeTask';
import { taskSymbols } from '../../utils/index';
import { Observable } from 'rxjs/Observable';


/**
 * pipe component
 *
 * @export
 * @abstract
 * @class PipeComponent
 * @extends {TaskComponent<T>}
 * @implements {ITask}
 * @implements {IPipeComponent<ITransform>}
 * @template T
 */
@Abstract()
export abstract class PipeComponent<T extends IPipeComponent> extends TaskComponent<T> implements ITask, IPipeComponent {
    constructor(
        name: string,
        runWay = RunWay.seqFirst,
        protected merger?: TransformMerger
    ) {
        super(name, runWay);
    }


    run(data?: ITransform | ITransform[]): Observable<ITransform> {
        return super.run(data)
            .map(rd => {
                return rd as ITransform;
            });
    }

    /**
     * execute tasks
     *
     * @protected
     * @param {(ITransform | ITransform[])} data
     * @returns {Observable<any>}
     * @memberof TaskComponent
     */
    execute(data: ITransform | ITransform[]): Observable<ITransform> {
        return this.merge(data)
            .flatMap(pstream => this.pipe(pstream));
    }

    /**
     * merge transforms
     *
     * @protected
     * @param {(ITransform | ITransform[])} data
     * @returns {ITransform}
     * @memberof PipeComponent
     */
    protected merge(data: ITransform | ITransform[]): Observable<ITransform> {
        let obsTrsf: Observable<ITransform>;
        if (isArray(data)) {
            obsTrsf = Observable.of(data, this.getScheduler())
                .flatMap(data => {
                    if (this.merger) {
                        if (isClass(this.merger)) {
                            if (this.isTask(this.merger)) {
                                return this.runByConfig<ITransform | ITransform[], ITransform>({ task: this.merger }, data)
                            }
                        } else if (isFunction(this.merger)) {
                            let trsf = this.merger(data);
                            if (isPromise(trsf) || trsf instanceof Observable) {
                                return trsf;
                            } else {
                                return Observable.of(trsf);
                            }
                        } else {
                            if (isFunction(this.merger['run'])) {
                                let merger = this.merger as ITransformMerger;
                                return merger.run(data);
                            } else if (isClass(this.merger['task'])) {
                                let opt = this.merger as ITaskOption<ITransformMerger>;
                                if (this.isTask(opt.task)) {
                                    return this.runByConfig(opt, data, );
                                }
                            }
                        }
                    }
                    return Observable.of(data.length ? data[0] : null, this.getScheduler());
                });

        } else {
            obsTrsf = Observable.of(data, this.getScheduler());
        }

        return obsTrsf.map(tranform => (tranform && isFunction(tranform.pipe)) ? tranform as ITransform : null);
    }

    /**
     * pipe transform.
     *
     * @abstract
     * @param {ITransform} transform
     * @returns {(Observable<ITransform> | Promise<ITransform>)}
     * @memberof PipeComponent
     */
    abstract pipe(transform: ITransform): Observable<ITransform> | Promise<ITransform>;


    /**
     * pipe to promise.
     *
     * @protected
     * @param {ITransform} source
     * @param {TransformExpress} pipes
     * @returns {Observable<ITransform>}
     * @memberof PipeComponent
     */
    protected pipeToObs(source: ITransform, pipes: TransformExpress): Observable<ITransform> {
        let obs = Observable.of(source);
        if (!pipes) {
            return obs;
        }
        let config = this.getConfig();
        let plist = isFunction(pipes) ? pipes(this.context, config, source) : pipes;
        plist.forEach(transform => {
            if (transform) {
                obs = obs
                    .flatMap(stream => {
                        return this.executePipe(stream, transform, config);
                    });
            }
        });

        return obs;
    }

    protected executePipe(stream: ITransform, transform: TransformType, config: IConfigure): Observable<ITransform> {
        let rpstram: Observable<ITransform> = Observable.of(stream);
        if (isClass(transform)) {
            rpstram = rpstram.flatMap(stream => this.runByConfig({ task: transform }, stream));
        } else if (isFunction(transform)) {
            rpstram = rpstram.flatMap(stream => {
                let trf = transform(this.context, config, stream);
                if (isPromise(trf) || trf instanceof Observable) {
                    return trf;
                } else {
                    return Observable.of(trf);
                }
            });
        } else {
            if (isClass(transform['task'])) {
                let opt = transform as ITaskOption<IPipeComponent>;
                rpstram = rpstram.flatMap(stream => this.runByConfig(opt, stream));
            } else {
                rpstram = rpstram.flatMap(stream => Observable.of(transform as ITransform));
            }
        }
        return rpstram.map(pst => {
            if (pst && isFunction(pst.pipe)) {
                if (pst.changeAsOrigin) {
                    stream = pst;
                } else {
                    stream = stream.pipe(pst);
                }
            }
            return stream;
        });
    }

}
