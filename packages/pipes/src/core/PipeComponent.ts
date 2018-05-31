import { ITask, RunWay, TaskComponent, IConfigure, Src } from '@taskp/core';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { Abstract, isArray, isString, isClass, isFunction, IContainer, getTypeMetadata, Inject, Registration } from '@ts-ioc/core';
import { TransformMerger, TransformExpress, TransformType, TransformSource } from './pipeTypes';
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

    protected pipes: TransformType[];
    constructor(name?: string) {
        super(name);
        this.pipes = [];
    }


    // run(data?: ITransform): Promise<ITransform> {
    //     return super.run(data);
    // }

    /**
     * execute tasks
     *
     * @protected
     * @param {(ITransform | ITransform[])} data
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    protected execute(data: ITransform): Promise<ITransform> {
        return this.pipeToPromise(data, this.pipes);
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
     * @param {TransformType[]} pipes
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected pipeToPromise(source: ITransform, pipes: TransformType[]): Promise<ITransform> {
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
