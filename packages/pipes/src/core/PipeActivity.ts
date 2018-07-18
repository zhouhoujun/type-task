import { IPipeContext, PipeContextToken } from './IPipeContext';
import { Inject, isArray } from '@ts-ioc/core';
import { IPipeActivity } from './IPipeActivity';
import { Activity, IActivity } from '@taskfr/core';
import { PipeTask } from '../decorators';
import { ITransform } from './ITransform';
import { TransformType, isTransform } from './pipeTypes';
import { IPipeConfigure } from './IPipeConfigure';

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
    merger: TransformType;

    /**
     * pipe config.
     *
     * @type {IPipeConfigure}
     * @memberof PipeActivity
     */
    config: IPipeConfigure;


    /**
     * run task.
     *
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns {Promise<T>}
     * @memberof Activity
     */
    async run(data?: any, execute?: IActivity): Promise<ITransform> {
        let stream = await this.merge(...(isArray(data) ? data : [data]));
        stream = await this.beforePipe(stream, execute);
        stream = await this.execute(stream);
        stream = await this.afterPipe(stream, execute);
        return stream;
    }

    /**
     * execute pipes.
     *
     * @protected
     * @param {ITransform} stream
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async execute(stream: ITransform): Promise<ITransform> {
       return await this.pipe(stream, ...this.pipes);
    }

    /**
     * begin pipe.
     *
     * @protected
     * @param {ITransform} stream
     * @param {IActivity} [execute]
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async beforePipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        if (execute instanceof PipeActivity) {
            stream = await this.pipe(stream, execute);
        }
        return stream;
    }

    /**
     * end pipe.
     *
     * @protected
     * @param {ITransform} stream
     * @param {IActivity} [execute]
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async afterPipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        return stream;
    }

    /**
     * pipe transform.
     *
     * @protected
     * @param {ITransform} stream
     * @param {...TransformType[]} pipes
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected pipe(stream: ITransform, ...pipes: TransformType[]): Promise<ITransform> {
        if (pipes.length < 1) {
            return Promise.resolve(stream);
        }

        if (pipes.length === 1) {
            return this.executePipe(stream, pipes[0]);
        }

        let pstream = Promise.resolve(stream);
        pipes.forEach(transform => {
            if (transform) {
                pstream = pstream
                    .then(stm => {
                        return this.executePipe(stm, transform);
                    });
            }
        });
        return pstream;
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
        let trans = data.filter(it => !it);
        if (trans.length > 1 && this.merger) {
            return this.context.exec(this, this.merger, data);
        } else {
            return Promise.resolve(isArray(data) ? data[0] : data);
        }
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
    protected async executePipe(stream: ITransform, transform: TransformType): Promise<ITransform> {
        let next: ITransform = await this.context.exec(this, transform, stream);
        if (isTransform(stream)) {
            if (isTransform(next)) {
                if (!next.changeAsOrigin) {
                    next = stream.pipe(next);
                }
            } else {
                next = stream;
            }
        }
        return next;
    }
}
