import { TaskComponent, IConfigure, TaskRunner, OnTaskInit } from '@taskp/core';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { Abstract, isArray, isClass, isFunction, Inject } from '@ts-ioc/core';
import { TransformMerger, TransformType, PipeExpress, isTransform } from './pipeTypes';
import { ITransformMerger } from './ITransformMerger';
import { IPipeContext, PipeContextToken } from './IPipeContext';
import { IPipeConfigure } from './IPipeConfigure';

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
export abstract class PipeComponent<T extends IPipeComponent> extends TaskComponent<T> implements IPipeComponent, OnTaskInit {

    @Inject(PipeContextToken)
    context: IPipeContext;

    /**
     * pipes.
     *
     * @type {TransformType[]}
     * @memberof PipeComponent
     */
    pipes: TransformType[];
    /**
     * stream merger.
     *
     * @type {TransformMerger}
     * @memberof PipeComponent
     */
    merger: TransformMerger;
    /**
     * await pipe compileted.
     *
     * @memberof PipeComponent
     */
    awaitPiped = false;

    private config: IPipeConfigure;

    constructor(name?: string) {
        super(name);
        this.pipes = [];
    }

    onTaskInit(config: IPipeConfigure) {
        this.config = config;
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
        let pStream = this.pipesToPromise(data, this.pipes);
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
            let merger = this.merger;
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

        let pstream = Promise.resolve(source);
        pipes.forEach(transform => {
            if (transform) {
                pstream = pstream
                    .then(stream => {
                        return this.executePipe(stream, transform, this.config);
                    });
            }
        });
        return pstream;

    }

    /**
     * execute pipe.
     *
     * @protected
     * @param {ITransform} stream
     * @param {TransformType} pipe
     * @param {IConfigure} config
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected executePipe(stream: ITransform, pipe: TransformType, config: IConfigure): Promise<ITransform> {
        let pstf: Promise<ITransform>;

        if (pipe instanceof TaskRunner) {
            console.log('runner', stream);
            pstf = pipe.start(stream);
        } else if (isTransform(stream)) {
            console.log('pipe', stream);
            if (!isClass(pipe) && isFunction(pipe)) {
                let pex = pipe as PipeExpress;
                pstf = Promise.resolve(pex(this.context, config, stream, this));
            } else if (isTransform(pipe)) {
                pstf = Promise.resolve(pipe as ITransform);
            }
            if (pstf) {
                pstf = pstf.then(pst => {
                    if (isTransform(pst)) {
                        if (pst.changeAsOrigin) {
                            stream = pst;
                        } else {
                            stream = stream.pipe(pst);
                        }
                    }
                    return stream;
                })
            }
        } else {
            console.log('not stream', stream);
            pstf = Promise.resolve(null);
        }

        return pstf;
    }
}
