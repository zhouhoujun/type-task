import { ITask, RunWay, TaskComponent, IConfigure, Src, TaskRunnerToken, ITaskBuilder, TaskRunner, TaskType, TaskBuilderToken, ITaskRunner } from '@taskp/core';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { Abstract, isArray, isString, isClass, isFunction, IContainer, getTypeMetadata, Inject, Registration, Token, Type, isMetadataObject } from '@ts-ioc/core';
import { TransformMerger, TransformExpress, TransformType, PipeExpress, isTransform, TransformMergerExpress } from './pipeTypes';
import { ITransformMerger } from './ITransformMerger';
import { IPipeTask } from './IPipeTask';
import { src, SrcOptions } from 'vinyl-fs';
import { IPipeContext, PipeContextToken } from './IPipeContext';

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
export abstract class PipeComponent<T extends IPipeComponent> extends TaskComponent<T> implements IPipeComponent {

    @Inject(PipeContextToken)
    context: IPipeContext;

    private pipes: TransformType[];
    private merger: TransformMerger;
    awaitPiped = false;

    constructor(name?: string) {
        super(name);
        this.pipes = [];
    }

    getPipes() {
        return this.pipes;
    }

    setPipes(pipes: TransformExpress) {
        if (pipes) {
            this.pipes = this.translatePipes(pipes);
        }
    }

    setMerger(merger: TransformMergerExpress) {
        if (merger) {
            this.merger = this.translateMerger(merger);
        }
    }

    getMerger(): TransformMerger {
        return this.merger;
    }

    protected translatePipes(pipes: TransformExpress): TransformType[] {
        let trsfs: (TransformType | TaskType<IPipeTask>)[] = this.context.to(pipes);
        if (!trsfs || trsfs.length < 1) {
            return [];
        }
        return trsfs.map(p => {
            if (isClass(p) && this.context.isTask(p)) {
                return this.context.getRunner(p);
            }
            if (isMetadataObject(p)) {
                let cfg = p as IConfigure;
                if (cfg.task || cfg.bootstrap) {
                    return this.context.getRunner(cfg);
                } else {
                    throw new Error('pipe configure error');
                }
            }
            return p as TransformType;
        });
    }

    protected translateMerger(mergerExp: TransformMergerExpress): TransformMerger {
        let mt: (TransformMerger | TaskType<IPipeTask>) = this.context.to(mergerExp);
        if (!mt) {
            return null;
        }
        let merger: TransformMerger;

        if (isClass(mt) && this.context.isTask(mt)) {
            merger = this.context.getRunner(mt);
        } else if (isMetadataObject(mt)) {
            let cfg = mt as IConfigure;
            if (cfg.task || cfg.bootstrap) {
                merger = this.context.getRunner(cfg);
            } else {
                throw new Error('pipe configure error');
            }
        } else {
            merger = mt as TransformMerger;
        }

        return merger;
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
        return this.merge(...isArray(data) ? data : [data])
            .then(pstream => this.pipe(pstream));
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
    protected pipe(data: ITransform): Promise<ITransform> {
        let pStream = this.pipesToPromise(data, this.getPipes());
        if (this.awaitPiped) {
            pStream = pStream.then(pipe => {
                if (!pipe) {
                    return null;
                }

                return new Promise((resolve, reject) => {
                    pipe
                        .once('end', () => {
                            resolve();
                        })
                        .once('error', reject);
                }).then(() => {
                    pipe.removeAllListeners('error');
                    pipe.removeAllListeners('end');
                    return pipe;
                }, err => {
                    pipe.removeAllListeners('error');
                    pipe.removeAllListeners('end');
                    process.exit(1);
                    return err;
                });
            });
        }
        return pStream;
    }

    /**
     * merge transforms
     *
     * @protected
     * @param {...ITransform[]} data
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected merge(...data: ITransform[]): Promise<ITransform> {
        let ptsf: Promise<ITransform>;
        let trans = data.filter(it => !it);
        if (trans.length > 1) {
            let merger = this.getMerger();
            if (merger) {
                if (merger instanceof TaskRunner) {
                    ptsf = merger.start(data);
                } else if (!isClass(merger) && isFunction(merger)) {
                    let mergerExp = merger as Function;
                    ptsf = Promise.resolve(mergerExp(data));
                } else {
                    if (isFunction(merger['run'])) {
                        let tsmerger = merger as ITransformMerger;
                        ptsf = tsmerger.run(data);
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
     * pipe to promise.
     *
     * @protected
     * @param {ITransform} source
     * @param {TransformType[]} pipes
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected pipesToPromise(source: ITransform, pipes: TransformType[]): Promise<ITransform> {
        if (!pipes) {
            return Promise.resolve(source);
        }
        let config = this.config;

        let pstream = Promise.resolve(source);
        pipes.forEach(transform => {
            if (transform) {
                pstream = pstream
                    .then(stream => {
                        return this.executePipe(stream, transform, config);
                    });
            }
        });
        return pstream;

    }


    protected executePipe(stream: ITransform, pipe: TransformType, config: IConfigure): Promise<ITransform> {
        let pstf: Promise<ITransform>;

        if (pipe instanceof TaskRunner) {
            pstf = pipe.start(stream);
        } else if (!isClass(pipe) && isFunction(pipe)) {
            let pexpress = pipe as PipeExpress;
            pstf = Promise.resolve(pexpress(this.context, config, stream, this));
        } else if (isTransform(pipe)) {
            pstf = Promise.resolve(pipe as ITransform);
        } else {
            pstf = Promise.resolve(null);
        }

        return pstf.then(pst => {
            if (isTransform(pst.pipe)) {
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
