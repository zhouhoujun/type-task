import { ITask, RunWay, TaskComponent, IConfigure, Src, TaskRunnerToken, ITaskBuilder, TaskRunner } from '@taskp/core';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { Abstract, isArray, isString, isClass, isFunction, IContainer, getTypeMetadata, Inject, Registration, Token, Type, isMetadataObject } from '@ts-ioc/core';
import { CtxType, TransformMerger, TransformExpress, TransformType, TransformSource, PipeExpress, isTransform } from './pipeTypes';
import { ITransformMerger } from './ITransformMerger';
import { IPipeTask } from './IPipeTask';
import { src, SrcOptions } from 'vinyl-fs';
import { ITaskContext, TaskContextToken } from './ITaskContext';

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

    @Inject(TaskContextToken)
    context: ITaskContext;

    private _pipes: TransformType[];
    constructor(name?: string) {
        super(name);
        this._pipes = [];
    }


    getPipes(): TransformType[] {
        return this._pipes || [];
    }

    setPipes(pipes: TransformExpress) {
        if (pipes) {
            this._pipes = this.translatePipes(pipes);
        }
    }

    protected translatePipes(pipes: TransformExpress): TransformType[] {
        let trsfs: TransformType[] = this.to(pipes);
        if (!trsfs || trsfs.length < 1) {
            return [];
        }
        trsfs = trsfs.map(p => {
            if (isClass(p) && this.context.isTask(p)) {
                return this.getRunner(p);
            }
            if (isMetadataObject(p)) {
                let cfg = p as IConfigure;
                if (cfg.task || cfg.bootstrap) {
                    return this.getRunner(cfg);
                } else {
                    throw new Error('pipe configure error');
                }
            }
            return p;
        });
        return trsfs;
    }

    /**
     * execute tasks
     *
     * @protected
     * @param {(ITransform | ITransform[])} data
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    protected execute(data: ITransform): Promise<ITransform> {
        return this.pipesToPromise(data, this.getPipes());
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
            pstf = Promise.resolve(pexpress(this.context, config, stream));
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

    protected to<T>(target: CtxType<T>): T {
        return this.context.to(target, this.config);
    }

}
