import { Task, IActivity, InjectAcitityToken, Activity, ParallelConfigure, } from '../core';
import { Token, isToken } from '@ts-ioc/core';


/**
 * parallel activity token.
 */
export const ParallelActivityToken = new InjectAcitityToken<ParallelActivity>('parallel');

/**
 * parallel activity.
 *
 * @export
 * @class ParallelActivity
 * @extends {Activity}
 */
@Task(ParallelActivityToken)
export class ParallelActivity extends Activity<any> {

    activites: IActivity[] = [];

    async onActivityInit(config: ParallelConfigure): Promise<any> {
        await super.onActivityInit(config);

        if (config.parallel && config.parallel.length) {
            await this.buildChildren(this, config.parallel);
        }

    }

    async buildChildren(activity: ParallelActivity, configs: (ParallelConfigure | Token<IActivity>)[]) {
        let children = await Promise.all(configs.map(async cfg => {
            let node = await this.buildActivity(cfg);
            if (!node) {
                return null;
            }
            if (node instanceof ParallelActivity) {
                if (!isToken(cfg) && cfg.parallel && cfg.parallel.length) {
                    await node.buildChildren(node, cfg.parallel);
                }
            }
            return node;
        }));

        activity.activites = children;
        return activity;
    }

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
