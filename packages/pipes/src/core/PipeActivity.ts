import { IPipeContext, PipeContextToken } from './IPipeContext';
import { Inject, isFunction, isClass, isArray } from '@ts-ioc/core';
import { IPipeActivity } from '../IPipeTask';
import { Activity, TaskRunner, IActivity } from '@taskfr/core';
import { PipeTask } from '../decorators';
import { ITransform } from '../ITransform';
import { TransformType, isTransform, PipeExpress, TransformMerger } from './pipeTypes';
import { IPipeConfigure } from './IPipeConfigure';
import { ITransformMerger } from './ITransformMerger';

/**
 * Pipe activity.
 *
 * @export
 * @class BaseTask
 * @implements {ITask}
 */
@PipeTask
export class PipeActivity extends Activity<ITransform> implements IPipeActivity {
    /**
     * context.
     *
     * @type {IPipeContext}
     * @memberof BaseTask
     */
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

    config: IPipeConfigure;


    /**
     * run task.
     *
     * @param {*} [data]
     * @param {IActivity<any>} [target]
     * @returns {Promise<T>}
     * @memberof Activity
     */
    run(data?: any, target?: IActivity<any>): Promise<ITransform> {
        return this.merge(...isArray(data) ? data : [data])
            .then(stream => this.pipe(stream));
    }

    /**
     * pipe transform.
     *
     * @protected
     * @param {ITransform} transform
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected pipe(stream: ITransform): Promise<ITransform> {
        return this.pipesToPromise(stream, this.pipes);
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

        return ptsf.then(tranform => isTransform(tranform) ? tranform as ITransform : null);
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
                        return this.executePipe(stream, transform);
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
     * @param {TransformType} transform
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected executePipe(stream: ITransform, transform: TransformType): Promise<ITransform> {
        let pstf: Promise<ITransform>;
        if (transform instanceof TaskRunner) {
            pstf = transform.start(stream);
        } else if (isTransform(stream)) {
            if (!isClass(transform) && isFunction(transform)) {
                let pex = transform as PipeExpress;
                pstf = Promise.resolve(pex(this.context, this, stream));
            } else if (isTransform(transform)) {
                pstf = Promise.resolve(transform as ITransform);
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
            pstf = Promise.resolve(null);
        }

        return pstf;
    }
}
