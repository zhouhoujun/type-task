import { IPipeContext, PipeContextToken } from './IPipeContext';
import { Inject, isFunction, isClass, isArray } from '@ts-ioc/core';
import { IPipeActivity } from './IPipeActivity';
import { Activity, TaskRunner, IActivity } from '@taskfr/core';
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
     * @param {IActivity<any>} [execute]
     * @returns {Promise<T>}
     * @memberof Activity
     */
    run(data?: any, execute?: IActivity<any>): Promise<ITransform> {
        return this.merge(...(isArray(data) ? data : [data]))
            .then(stream => this.pipe(stream, ...this.getRunPipes(execute)));
    }

    protected getRunPipes(execute?: IActivity<any>) {
        let pipes = this.pipes;
        if (execute) {
            if (execute instanceof PipeActivity) {
                pipes = pipes.concat([execute]);
            }
        }
        return pipes;
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
