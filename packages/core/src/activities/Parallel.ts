import { Task, IActivity, OnTaskInit, IConfigure, InjectAcitityToken, InjectAcitityBuilderToken, ActivityBuilder, Activity, ActivityResultType } from '../core';
import { Singleton, Token, isToken } from '@ts-ioc/core';


/**
 * parallel activity token.
 */
export const ParallelActivityToken = new InjectAcitityToken<ParallelActivity>('parallel');

/**
 * Parallel activity builder token.
 */
export const ParallelActivityBuilderToken = new InjectAcitityBuilderToken<ParallelActivityBuilder>('parallel');



/**
 * Parallel activity configure.
 *
 * @export
 * @interface ParallelConfigure
 * @extends {IConfigure}
 */
export interface ParallelConfigure extends IConfigure {
    /**
     * parallel activities.
     *
     * @type {CtxType<number>}
     * @memberof ParallelConfigure
     */
    parallel?: ActivityResultType<any>[];
}


/**
 * parallel activity.
 *
 * @export
 * @class ParallelActivity
 * @extends {Activity}
 */
@Task(ParallelActivityToken, ParallelActivityBuilderToken)
export class ParallelActivity extends Activity<any> {

    activites: IActivity<any>[] = [];

    run(data?: any): Promise<any> {
        return Promise.all(this.activites.map(task => task.run(data)));
    }

}

@Singleton(ParallelActivityBuilderToken)
export class ParallelActivityBuilder extends ActivityBuilder {

    async buildStrategy(activity: IActivity<any>, config: ParallelConfigure): Promise<IActivity<any>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof ParallelActivity) {
            if (config.parallel && config.parallel.length) {
                await this.buildChildren(activity, config.parallel);
            }
        }

        return activity;
    }

    async buildChildren(activity: ParallelActivity, configs: (IConfigure | Token<IActivity<any>>)[]) {
        let children = await Promise.all(configs.map(async cfg => {
            let node = await this.build(cfg, activity.id);
            if (!node) {
                return null;
            }
            if (node instanceof ParallelActivity) {
                if (!isToken(cfg) && cfg.parallel && cfg.parallel.length) {
                    await this.buildChildren(node, cfg.parallel);
                }
            }
            return node;
        }));

        activity.activites = children;
        return activity;
    }
}
