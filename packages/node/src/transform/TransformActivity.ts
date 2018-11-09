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

    getContext(): TransformActivityContext {
        return super.getContext() as TransformActivityContext;
    }

    /**
     * run task.
     *
     * @param {IActivity} [execute]
     * @returns {Promise<T>}
     * @memberof Activity
     */
    protected async execute() {
        await this.beforePipe();
        await this.pipe();
        await this.afterPipe();
    }

    /**
     * execute pipe.
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof PipeActivity
     */
    protected async pipe(): Promise<void> {
        let ctx = this.getContext();
        ctx.result = await this.pipeStream(ctx.result, ...this.pipes);
    }

    /**
     * create activity context.
     *
     * @protected
     * @memberof PipeActivity
     */
    protected verifyCtx(ctx?: any) {
        if (ctx instanceof TransformActivityContext) {
            this._ctx = ctx;
        } else {
            this.getContext().setAsResult(ctx);
        }
    }

    /**
     * begin pipe.
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof PipeActivity
     */
    protected async beforePipe(): Promise<void> {

    }


    /**
     * end pipe.
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof PipeActivity
     */
    protected async afterPipe(): Promise<void> {

    }

    /**
     * stream pipe transform.
     *
     * @protected
     * @param {ITransform} stream
     * @param {...TransformType[]} pipes
     * @returns {Promise<ITransform>}
     * @memberof PipeActivity
     */
    protected async pipeStream(stream: ITransform, ...pipes: TransformType[]): Promise<ITransform> {
        if (pipes.length < 1) {
            return stream;
        }

        if (pipes.length === 1) {
            return await this.executePipe(stream, pipes[0]);
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
    protected async executePipe(stream: ITransform, transform: TransformType, waitend = false): Promise<ITransform> {
        let next: ITransform;
        let transPipe = await this.getContext().exec(this, transform);
        let piped = false;
        if (isTransform(stream)) {
            if (isTransform(transPipe)) {
                if (!transPipe.changeAsOrigin) {
                    piped = true;
                    next = stream.pipe(transPipe);
                } else {
                    next = transPipe;
                }
            } else {
                next = stream;
            }
        }

        if (piped && waitend) {
            return await new Promise((r, j) => {
                next
                    .once('end', r)
                    .once('error', j);
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
        let trsfs: TransformConfig[] = this.getContext().to(pipes);
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
            return await Promise.resolve(cfg(this, this.getContext()));
        }

        if (isPromise(cfg)) {
            return await cfg;
        }

        assertExp(isMetadataObject(cfg), 'transform configure error');
        return cfg as TransformType;
    }
}
