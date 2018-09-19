import { IPipeContext, PipeContextToken } from './IPipeContext';
import { Inject, isUndefined } from '@ts-ioc/core';
import { IPipeActivity, PipeActivityToken } from './IPipeActivity';
import { Activity, InputDataToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import { TransformType, isTransform } from './pipeTypes';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeTask } from '../decorators';
import { PipeActivityContext } from './PipeActivityContext';

/**
 * Pipe activity.
 *
 * @export
 * @class BaseTask
 * @implements {ITask}
 */
@PipeTask(PipeActivityToken)
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
     * @param {PipeActivityContext} ctx
     * @param {IActivity} [execute]
     * @returns {Promise<T>}
     * @memberof Activity
     */
    protected async execute(ctx: PipeActivityContext) {
        await this.beforePipe(ctx);
        await this.pipe(ctx);
        await this.afterPipe(ctx);
    }

    protected createCtx(input?: any) {
        return this.context.getContainer().resolve(PipeActivityContext, { provide: InputDataToken, useValue: input });
    }

    /**
     * execute pipe.
     *
     * @protected
     * @param {PipeActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async pipe(ctx: PipeActivityContext): Promise<void> {
        ctx.data = await this.pipeStream(ctx.data, ctx, ...this.pipes);
    }

    /**
     * begin pipe.
     *
     * @protected
     * @param {PipeActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async beforePipe(ctx: PipeActivityContext): Promise<void> {

    }

    /**
     * end pipe.
     *
     * @protected
     * @param {PipeActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async afterPipe(ctx: PipeActivityContext): Promise<void> {

    }

    /**
     * stream pipe transform.
     *
     * @protected
     * @param {ITransform} stream
     * @param {PipeActivityContext} ctx
     * @param {...TransformType[]} pipes
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async pipeStream(stream: ITransform, ctx: PipeActivityContext, ...pipes: TransformType[]): Promise<ITransform> {
        if (pipes.length < 1) {
            return stream;
        }

        if (pipes.length === 1) {
            return await this.executePipe(stream, ctx, pipes[0]);
        }

        let pstream = Promise.resolve(stream);
        pipes.forEach(transform => {
            if (transform) {
                pstream = pstream
                    .then(stm => {
                        return this.executePipe(stm, ctx, transform);
                    });
            }
        });
        return await pstream;
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
    protected async executePipe(stream: ITransform, ctx: PipeActivityContext, transform: TransformType, waitend = false): Promise<ITransform> {
        let next: ITransform = await this.context.exec(this, transform, ctx);
        let piped = false;
        if (isTransform(stream)) {
            if (isTransform(next)) {
                if (!next.changeAsOrigin) {
                    piped = true;
                    next = stream.pipe(next);
                }
            } else {
                next = stream;
            }
        }

        if (piped && waitend) {
            return await new Promise((resolve, reject) => {
                next
                    .once('end', () => {
                        resolve();
                    })
                    .once('error', reject);
            }).then(() => {
                next.removeAllListeners('error');
                next.removeAllListeners('end');
                return next;
            }, err => {
                next.removeAllListeners('error');
                next.removeAllListeners('end');
                if (!isUndefined(process)) {
                    process.exit(1);
                    return err;
                } else {
                    return Promise.reject(new Error(err));
                }
            });
        } else {
            return next;
        }
    }
}
