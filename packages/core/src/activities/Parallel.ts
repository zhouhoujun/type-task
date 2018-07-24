import {
    Task, IActivity, InjectAcitityToken, InjectAcitityBuilderToken,
    ActivityBuilder, Activity, ParallelConfigure
} from '../core';
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
 * parallel activity.
 *
 * @export
 * @class ParallelActivity
 * @extends {Activity}
 */
@Task(ParallelActivityToken, ParallelActivityBuilderToken)
export class ParallelActivity extends Activity<any> {

    activites: IActivity[] = [];

    /**
     * run parallel activity.
     *
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns {Promise<any>}
     * @memberof ParallelActivity
     */
    async run(data?: any, execute?: IActivity): Promise<any> {
        let result = await this.before(data, execute);
        result = await this.execute(result, execute);
        result = await this.after(result, execute);
        return result;
    }

    /**
     * before run parallel.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof ParallelActivity
     */
    protected async before(data?: any, execute?: IActivity): Promise<any> {
        return data;
    }

    /**
     * execute parallel.
     *
     * @protected
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns {Promise<any>}
     * @memberof ParallelActivity
     */
    protected execute(data?: any, execute?: IActivity): Promise<any> {
        return Promise.all(this.activites.map(task => task.run(data)));
    }

    /**
     * after run parallel.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof ParallelActivity
     */
    protected async after(data?: any, execute?: IActivity): Promise<any> {
        return data;
    }

}

@Singleton(ParallelActivityBuilderToken)
export class ParallelActivityBuilder extends ActivityBuilder {

    async buildStrategy(activity: IActivity, config: ParallelConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof ParallelActivity) {
            if (config.parallel && config.parallel.length) {
                await this.buildChildren(activity, config.parallel);
            }
        }

        return activity;
    }

    async buildChildren(activity: ParallelActivity, configs: (ParallelConfigure | Token<IActivity>)[]) {
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
