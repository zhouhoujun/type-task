import { isUndefined, isPromise, isMetadataObject } from '@ts-ioc/core';
import { IPipeActivity, PipeActivityToken } from './IPipeActivity';
import { ITransform } from './ITransform';
import { TransformType, isTransform, TransformExpress, TransformConfig } from './pipeTypes';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeActivityContext } from './PipeActivityContext';
import { NodeActivity } from '@taskfr/node';
import { Task, isActivityRunner, isActivityType } from '@taskfr/core';

/**
 * Pipe activity.
 *
 * @export
 * @class BaseTask
 * @implements {ITask}
 */
@Task(PipeActivityToken)
export class PipeActivity extends NodeActivity implements IPipeActivity {

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

    async onActivityInit(config: IPipeConfigure) {
        await super.onActivityInit(config);
        if (config.pipes) {
            this.pipes = await this.translate(config.pipes);
        }
    }

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
     * create activity context.
     *
     * @protected
     * @param {*} [input]
     * @returns {PipeActivityContext}
     * @memberof PipeActivity
     */
    protected verifyCtx(input?: any): PipeActivityContext {
        let ctx: PipeActivityContext = super.verifyCtx(input) as PipeActivityContext;
        if (!(ctx instanceof PipeActivityContext)) {
            ctx = this.ctxFactory.create(ctx) as PipeActivityContext;
        }
        return ctx;
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
     * @param {TransformConfig} tsCfg
     * @returns {Promise<TransformType>}
     * @memberof PipeActivityBuilder
     */
    protected async translateConfig(tsCfg: TransformConfig): Promise<TransformType> {
        if (isActivityRunner(tsCfg)) {
            return tsCfg;
        } else if (isActivityType(tsCfg)) {
            return await this.buildActivity(tsCfg);
        }

        if (isPromise(tsCfg)) {
            return await tsCfg;
        }

        if (isMetadataObject(tsCfg)) {
            throw new Error('transform configure error');
        }

        return tsCfg as TransformType;
    }
}
