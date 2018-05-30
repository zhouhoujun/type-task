import { ITask, ITaskOption, RunWay, TaskComponent, IConfigure, Src } from '@taskp/core';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { Abstract, isArray, isString, isClass, isFunction, IContainer, getTypeMetadata, Inject, Registration } from '@ts-ioc/core';
import { TransformMerger, TransformExpress, TransformType, TransformSource } from './pipeTypes';
import { ITransformMerger } from './ITransformMerger';
import { IPipeTask } from './IPipeTask';
import { src, SrcOptions } from 'vinyl-fs';
import { ITaskContext, TaskContextToken } from '.';

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

    @Inject(TaskContextToken)
    context: ITaskContext;

    constructor(
        name: string,
        runWay = RunWay.seqFirst,
        protected merger?: TransformMerger
    ) {
        super(name, runWay);
    }


    run(data?: Src | ITransform | ITransform[]): Promise<ITransform> {
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
    protected execute(data: Src | ITransform | ITransform[]): Promise<ITransform> {
        let exData = isArray(data) ? data : [data];
        if (exData.some(it => isString(it))) {
            return this.source(<string[]>exData)
                .then(pstream => this.pipe(pstream));
        } else {

            return this.merge(<ITransform[]>exData)
                .then(pstream => this.pipe(pstream));
        }
    }

    protected source(data: string[]): Promise<ITransform> {
        return Promise.resolve(src(data));
    }

    /**
     * merge transforms
     *
     * @protected
     * @param {ITransform[]} data
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected merge(data: ITransform[]): Promise<ITransform> {
        let ptsf: Promise<ITransform>;
        let trans: any[] = data.filter(it => !it);
        if (trans.length > 1) {
            let runner = this.getRunner();
            if (this.merger) {
                if (isClass(this.merger)) {
                    if (runner.isTask(this.merger)) {
                        ptsf = runner.runTask(this.merger, data)
                    }
                } else if (isFunction(this.merger)) {
                    ptsf = Promise.resolve(this.merger(data));
                } else {
                    if (isFunction(this.merger['run'])) {
                        let merger = this.merger as ITransformMerger;
                        ptsf = merger.run(data);
                    } else if (isClass(this.merger['task'])) {
                        let opt = this.merger as ITaskOption<ITransformMerger>;
                        if (runner.isTask(opt.task)) {
                            ptsf = runner.runByConfig(opt, data, );
                        }
                    }
                }
            }
        }

        if (!ptsf) {
            ptsf = Promise.resolve(isArray(data) ? data[0] : data);
        }

        return ptsf.then(tranform => (tranform && isFunction(tranform.pipe)) ? tranform as ITransform : null);
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
        let pstf: Promise<ITransform>;
        let runner = this.getRunner();
        if (isClass(transform)) {
            if (runner.isTask(transform)) {
                pstf = runner.runTask(transform, stream);
            }
        } else if (isFunction(transform)) {
            pstf = Promise.resolve(transform(this.context, config, stream));
        } else {
            if (isClass(transform['task'])) {
                let opt = transform as ITaskOption<IPipeComponent>;
                pstf = runner.runByConfig(opt, stream);
            } else {
                pstf = Promise.resolve(transform as ITransform);
            }
        }
        return pstf.then(pst => {
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