import { ChainActivity, Task, ChainConfigure, CtxType, Src, ExpressionToken, ConfigureType, Active, IActivity } from '@taskfr/core';
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
     * before build activity.
     *
     * @type {Active}
     * @memberof BuildConfigure
     */
    beforeBuildBody?: Active;

    /**
     * do sth, after build completed.
     *
     * @type {Active}
     * @memberof BuildConfigure
     */
    completedBody?: Active;
}

/**
 * build activity.
 *
 * @export
 * @class BuildActivity
 * @extends {ChainActivity}
 */
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
     * before build body.
     *
     * @type {IActivity}
     * @memberof BuildActivity
     */
    beforeBuildBody: IActivity;

    /**
     * do sth, after build completed.
     *
     * @type {IActivity}
     * @memberof BuildActivity
     */
    completedBody: IActivity;

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

        if (config.beforeBuildBody) {
            this.beforeBuildBody = await this.buildActivity(config.beforeBuildBody);
        }
        if (config.completedBody) {
            this.completedBody = await this.buildActivity(config.completedBody);
        }
    }

    /**
     * execute once build action.
     *
     * @protected
     * @param {BuidActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof BuildActivity
     */
    protected async execOnce(ctx: BuidActivityContext): Promise<void> {
        if (this.watch) {
            this.watch.body = this;
            let watchCtx = this.verifyCtx();
            watchCtx.target = this.watch;
            this.watch.run(watchCtx);
        }
        ctx.input = await this.context.getFiles(this.src);
    }

    /**
     * execute build action.
     *
     * @protected
     * @param {BuidActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof BuildActivity
     */
    protected async execute(ctx: BuidActivityContext): Promise<void> {
        if (!(this.watch && ctx.target === this.watch)) {
            await this.execOnce(ctx);
        }
        let bctx = this.verifyCtx(ctx.execResult);
        if (this.beforeBuildBody) {
            await this.beforeBuildBody.run(bctx);
        }
        await super.execute(bctx);
        if (this.completedBody) {
            await this.completedBody.run(bctx);
        }
    }

    protected verifyCtx(input?: any): BuidActivityContext {
        let ctx = super.verifyCtx(input) as BuidActivityContext;
        ctx.builder = this;
        return ctx;
    }
}
