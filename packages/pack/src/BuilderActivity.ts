import { ChainActivity, Task, ChainConfigure, CtxType, Src, ActivityContext, ExpressionToken, ConfigureType } from '@taskfr/core';
import { WatchActivity, WatchConfigure, INodeContext, NodeContextToken, FileChanged } from '@taskfr/node';
import { Inject, isArray, isBoolean } from '@ts-ioc/core';

/**
 * builder configure.
 *
 * @export
 * @interface BuilderConfigure
 * @extends {ChainConfigure}
 */
export interface BuilderConfigure extends ChainConfigure {
    /**
     * src root.
     *
     * @type {CtxType<Src>}
     * @memberof BuilderConfigure
     */
    src: CtxType<Src>;

    /**
     * watch
     *
     * @type {(ExpressionToken<Src | boolean> | ConfigureType<WatchActivity, WatchConfigure>)}
     * @memberof BuilderConfigure
     */
    watch?: ExpressionToken<Src | boolean> | ConfigureType<WatchActivity, WatchConfigure>;
}

@Task('builder')
export class BuilderActivity extends ChainActivity {

    /**
     * build src root.
     *
     * @type {Src}
     * @memberof BuilderActivity
     */
    src: Src;
    /**
     * watch activity. watch the build.
     *
     * @type {WatchActivity}
     * @memberof BuilderActivity
     */
    watch: WatchActivity;

    @Inject(NodeContextToken)
    context: INodeContext;

    async onActivityInit(config: BuilderConfigure) {
        await super.onActivityInit(config);
        this.src = this.context.to(config.src);
        if (config.watch) {
            this.watch = await this.toActivity<Src | boolean, WatchActivity, WatchConfigure>(
                config.watch,
                act => act instanceof WatchActivity,
                watch => {
                    if (isBoolean(watch)) {
                        if (watch && this.src) {
                            return <WatchConfigure>{ src: this.src, task: WatchActivity };
                        }
                        return null;
                    }
                    return <WatchConfigure>{ src: watch, task: WatchActivity };
                });
        }
    }

    protected async execute(ctx: ActivityContext): Promise<any> {
        if (!(this.watch && ctx.target === this.watch)) {
            if (this.watch) {
                this.watch.body = this;
                let watchCtx = this.createCtx();
                watchCtx.target = this.watch;
                this.watch.run(watchCtx);
            }
            ctx.input = this.src;
            ctx.data = await this.context.getFiles(this.src);
        }

        let files = this.getFiles(ctx);
        await Promise.all(files.map(fl => {
            return super.execute(this.createCtx(fl));
        }));
    }

    getFiles(ctx: ActivityContext): string[] {
        let files: string[] = [];
        if (ctx.data instanceof FileChanged) {
            files = ctx.data.changed();
        } else if (isArray(ctx.data)) {
            files = ctx.data;
        }
        return files;
    }
}
