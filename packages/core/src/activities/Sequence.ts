import {
    Task, IActivity, InjectAcitityToken,
    InjectAcitityBuilderToken, ActivityBuilder, Activity,
    SequenceConfigure,
    IActivityBuilder
} from '../core';
import { Token, isToken, Injectable } from '@ts-ioc/core';


/**
 * sequence activity token
 */
export const SequenceActivityToken = new InjectAcitityToken<SequenceActivity>('sequence');

/**
 * sequence activity builder token
 */
export const SequenceActivityBuilderToken = new InjectAcitityBuilderToken<SequenceActivityBuilder>('sequence');

/**
 * sequence activity.
 *
 * @export
 * @class SequenceActivity
 * @extends {Activity}
 */
@Task(SequenceActivityToken, SequenceActivityBuilderToken)
export class SequenceActivity extends Activity<any> {

    activites: IActivity[] = [];

    async run(data?: any, execute?: IActivity): Promise<any> {
        let result = await this.before(data, execute);
        result = await this.execute(result, execute);
        result = await this.after(result, execute);
        return result;
    }

    /**
     * before run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof SequenceActivity
     */
    protected async before(data?: any, execute?: IActivity): Promise<any> {
        return data;
    }

    protected execute(data?: any, execute?: IActivity): Promise<any> {
        let execPromise = Promise.resolve(data);
        this.activites.forEach(task => {
            execPromise = execPromise.then(pdata => task.run(pdata));
        });
        return execPromise;
    }

    /**
     * after run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof SequenceActivity
     */
    protected async after(data?: any, execute?: IActivity): Promise<any> {
        return data;
    }
}

@Injectable(SequenceActivityBuilderToken)
export class SequenceActivityBuilder extends ActivityBuilder {

    createBuilder(): IActivityBuilder {
        return this.container.get(SequenceActivityBuilderToken);
    }

    async buildStrategy(activity: IActivity, config: SequenceConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof SequenceActivity) {
            if (config.sequence && config.sequence.length) {
                await this.buildChildren(activity, config.sequence);
            }
        }

        return activity;
    }

    async buildChildren(activity: SequenceActivity, configs: (SequenceConfigure | Token<IActivity>)[]) {
        let sequence = await Promise.all(configs.map(async cfg => {
            let node = await this.build(cfg, activity.id);
            if (!node) {
                return null;
            }
            if (node instanceof SequenceActivity) {
                if (!isToken(cfg) && cfg.sequence && cfg.sequence.length) {
                    await this.buildChildren(node, cfg.sequence);
                }
            }
            return node;
        }));

        activity.activites = sequence;
        return activity;
    }
}
