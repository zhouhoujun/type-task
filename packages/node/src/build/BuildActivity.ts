import { ChainActivity, Task, ChainConfigure, CtxType, Src, ExpressionToken, ConfigureType, InputDataToken, Active, IActivity } from '@taskfr/core';
import { Inject, isBoolean, Token } from '@ts-ioc/core';
import { WatchActivity, WatchConfigure } from '../activities';
import { INodeContext, NodeContextToken } from '../core';
import { BuidActivityContext } from './BuidActivityContext';
import { BuildHandleConfigure, BuildHandleActivity } from './BuildHandleActivity';

/**
 * builder configure.
 *
 * @export
 * @interface BuildConfigure
 * @extends {ChainConfigure}
 */
export interface BuildConfigure extends ChainConfigure {
    /**
     * src root.
     *
     * @type {CtxType<Src>}
     * @memberof BuildConfigure
     */
    src: CtxType<Src>;

    /**
     * build dist.
     *
     * @type {CtxType<string>}
     * @memberof BuildConfigure
     */
    dist: CtxType<string>;

    /**
     * handle activities.
     *
     * @type {(BuildHandleConfigure | Token<BuildHandleActivity>)[];}
     * @memberof ChainConfigure
     */
    handles?: (BuildHandleConfigure | Token<BuildHandleActivity>)[];

    /**
     * watch
     *
     * @type {(ExpressionToken<Src | boolean> | ConfigureType<WatchActivity, WatchConfigure>)}
     * @memberof BuildConfigure
     */
    watch?: ExpressionToken<Src | boolean> | ConfigureType<WatchActivity, WatchConfigure>;

    /**
     * do sth, after build completed.
     *
     * @type {Active}
     * @memberof BuildConfigure
     */
    completed?: Active;
}

@Task('build')
export class BuildActivity extends ChainActivity {

    /**
     * build src root.
     *
     * @type {Src}
     * @memberof BuildActivity
     */
    src: Src;

    /**
     * build dist.
     *
     * @type {string}
     * @memberof BuildActivity
     */
    dist: string;
    /**
     * watch activity. watch the build.
     *
     * @type {WatchActivity}
     * @memberof BuildActivity
     */
    watch: WatchActivity;

    @Inject(NodeContextToken)
    context: INodeContext;

    /**
     * do sth, after build completed.
     *
     * @type {IActivity}
     * @memberof BuildActivity
     */
    completed: IActivity;

    async onActivityInit(config: BuildConfigure) {
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
        if (config.completed) {
            this.completed = await this.buildActivity(config.completed);
        }
    }

    protected async execute(ctx: BuidActivityContext): Promise<void> {
        if (!(this.watch && ctx.target === this.watch)) {
            if (this.watch) {
                this.watch.body = this;
                let watchCtx = this.createCtx();
                watchCtx.target = this.watch;
                this.watch.run(watchCtx);
            }
            ctx.input = await this.context.getFiles(this.src);
        }
        let bctx = this.createCtx(ctx.getState());
        await super.execute(bctx);
        if (this.completed) {
            await this.completed.run(bctx);
        }
    }

    protected createCtx(input?: any) {
        let ctx = this.context.getContainer().resolve(BuidActivityContext, { provide: InputDataToken, useValue: input });
        ctx.builder = this;
        return ctx;
    }
}
