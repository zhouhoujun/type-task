import { Task, ITask, RunWay, ITaskComponent, TaskComponent, ITaskProvider, IConfigure } from '../../core/index';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { Abstract, isArray, isClass, isFunction, IContainer } from 'tsioc';
import { TransformMerger, TransformExpress, TransformType } from './pipeTypes';
import { ITransformMerger } from './ITransformMerger';
import { ITaskOption } from '../../core/ITaskOption';
import { IPipeTask } from '.';


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


    run(data?: ITransform | ITransform[]): Promise<ITransform> {
        return super.run(data)
            .then(rd => {
                return rd as ITransform;
            });
    }

    /**
     * execute tasks
     *
     * @protected
     * @param {(ITransform | ITransform[])} data
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    protected execute(data: ITransform | ITransform[]): Promise<ITransform> {
        return this.mergeTransforms(data)
            .then(pstream => this.pipe(pstream));
    }

    /**
     * merge transforms
     *
     * @protected
     * @param {(ITransform | ITransform[])} data
     * @returns {ITransform}
     * @memberof PipeComponent
     */
    protected mergeTransforms(data: ITransform | ITransform[]): Promise<ITransform> {
        let ptranform: Promise<ITransform>;
        if (isArray(data)) {
            if (this.merger) {
                if (isClass(this.merger)) {
                    if (this.isTask(this.merger)) {
                        ptranform = this.runPipeTask(this.context.container, data, { task: this.merger })
                    }
                } else if (isFunction(this.merger)) {
                    ptranform = Promise.resolve(this.merger(data));
                } else {
                    if (isFunction(this.merger['run'])) {
                        let merger = this.merger as ITransformMerger;
                        ptranform = merger.run(data);
                    } else if (isClass(this.merger['task'])) {
                        let opt = this.merger as ITaskOption<ITransformMerger>;
                        if (this.isTask(opt.task)) {
                            ptranform = this.runPipeTask(this.context.container, data, opt);
                        }
                    }
                }
            }
        }

        if (!ptranform) {
            ptranform = Promise.resolve(isArray(data) ? data[0] : data);
        }

        return ptranform.then(tranform => (tranform && isFunction(tranform.pipe)) ? tranform as ITransform : null);
    }

    /**
     * pipe transform.
     *
     * @protected
     * @abstract
     * @param {ITransform} transform
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected abstract pipe(transform: ITransform): Promise<ITransform>;


    /**
     * pipe to promise.
     *
     * @protected
     * @param {ITransform} source
     * @param {TransformExpress} pipes
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected pipeToPromise(source: ITransform, pipes: TransformExpress): Promise<ITransform> {
        if (!pipes) {
            return Promise.resolve(source);
        }
        let config = this.getConfig();
        return Promise.resolve(isFunction(pipes) ? pipes(this.context, config, source) : pipes)
            .then(transforms => {
                transforms = transforms || [];
                let pstream = Promise.resolve(source);
                transforms.forEach(transform => {
                    if (transform) {
                        pstream = pstream
                            .then(stream => {
                                return this.executePipe(stream, transform, config);
                            });
                    }
                });

                return pstream;
            });
    }

    protected executePipe(stream: ITransform, transform: TransformType, config: IConfigure): Promise<ITransform> {
        let rpstram: Promise<ITransform>
        if (isClass(transform)) {
            rpstram = this.runPipeTask(this.context.container, stream, { task: transform });
        } else if (isFunction(transform)) {
            rpstram = Promise.resolve(transform(this.context, config, stream));
        } else {
            if (isClass(transform['task'])) {
                let opt = transform as ITaskOption<IPipeComponent>;
                rpstram = this.runPipeTask(this.context.container, stream, opt);
            } else {
                rpstram = Promise.resolve(transform as ITransform);
            }
        }
        return rpstram.then(pst => {
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

    protected runPipeTask(container: IContainer, source: ITransform | ITransform[], pipeOption: ITaskOption<IPipeTask<any>>): Promise<ITransform> {
        if (pipeOption && this.isTask(pipeOption.task)) {
            if (!container.has(pipeOption.task)) {
                container.register(pipeOption.task);
            }
            return container.resolve(pipeOption.task, pipeOption.providers).run(source);
        }
        return Promise.resolve(null);
    }

}
