import { isUndefined, isPromise, isMetadataObject, assertExp, isFunction } from '@ts-ioc/core';
import { ITransformActivity, TransformActivityToken } from './ITransformActivity';
import { ITransform } from './ITransform';
import { TransformType, isTransform, TransformExpress, TransformConfig } from './transformTypes';
import { ITransformConfigure } from './ITransformConfigure';
import { TransformActivityContext } from './TransformActivityContext';
import { Task, isActivityRunner, isActivityType } from '@taskfr/core';
import { NodeActivity } from '../core';

/**
 * Transform activity.
 *
 * @export
 * @class BaseTask
 * @implements {ITask}
 */
@Task(TransformActivityToken)
export class TransformActivity extends NodeActivity implements ITransformActivity {

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
     * @type {ITransformConfigure}
     * @memberof PipeActivity
     */
    config: ITransformConfigure;

    async onActivityInit(config: ITransformConfigure) {
        await super.onActivityInit(config);
        if (config.pipes) {
            this.pipes = await this.translate(config.pipes);
        }
    }

    /**
     * run task.
     *
     * @param {TransformActivityContext} ctx
     * @param {IActivity} [execute]
     * @returns {Promise<T>}
     * @memberof Activity
     */
    protected async execute(ctx: TransformActivityContext) {
        await this.beforePipe(ctx);
        await this.pipe(ctx);
        await this.afterPipe(ctx);
    }

    /**
     * execute pipe.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async pipe(ctx: TransformActivityContext): Promise<void> {
        ctx.result = await this.pipeStream(ctx.result, ctx, ...this.pipes);
    }

    /**
     * create activity context.
     *
     * @protected
     * @param {*} [input]
     * @returns {TransformActivityContext}
     * @memberof PipeActivity
     */
    protected verifyCtx(input?: any): TransformActivityContext {
        if (input instanceof TransformActivityContext) {
            return input;
        } else {
            return super.verifyCtx(input) as TransformActivityContext;
        }
    }

    /**
     * begin pipe.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async beforePipe(ctx: TransformActivityContext): Promise<void> {

    }


    /**
     * end pipe.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async afterPipe(ctx: TransformActivityContext): Promise<void> {

    }

    /**
     * stream pipe transform.
     *
     * @protected
     * @param {ITransform} stream
     * @param {TransformActivityContext} ctx
     * @param {...TransformType[]} pipes
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async pipeStream(stream: ITransform, ctx: TransformActivityContext, ...pipes: TransformType[]): Promise<ITransform> {
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
    protected async executePipe(stream: ITransform, ctx: TransformActivityContext, transform: TransformType, waitend = false): Promise<ITransform> {
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

    /**
     * translate pipes express.
     *
     * @protected
     * @param {TransformExpress} pipes
     * @returns {Promise<TransformType[]>}
     * @memberof PipeActivityBuilder
     */
    protected translate(pipes: TransformExpress): Promise<TransformType[]> {
        let trsfs: TransformConfig[] = this.context.to(pipes);
        if (!trsfs || trsfs.length < 1) {
            return Promise.resolve([]);
        }
        return Promise.all(trsfs.map(p => this.translateConfig(p)));
    }
    /**
     * translate transform config.
     *
     * @protected
     * @param {TransformConfig} cfg
     * @returns {Promise<TransformType>}
     * @memberof PipeActivityBuilder
     */
    protected async translateConfig(cfg: TransformConfig): Promise<TransformType> {
        if (isActivityRunner(cfg)) {
            return cfg;
        } else if (isActivityType(cfg)) {
            return await this.buildActivity(cfg);
        } else if (isFunction(cfg)) {
            return await Promise.resolve(cfg(this, this.ctx));
        }

        if (isPromise(cfg)) {
            return await cfg;
        }

        assertExp(isMetadataObject(cfg), 'transform configure error');
        return cfg as TransformType;
    }
}
