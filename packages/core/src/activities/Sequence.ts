import { Task, IActivity, IConfigure, InjectAcitityToken, InjectAcitityBuilderToken, ActivityBuilder, Activity, ActivityType } from '../core';
import { Singleton, Token, isToken } from '@ts-ioc/core';


/**
 * sequence activity token
 */
export const SequenceActivityToken = new InjectAcitityToken<SequenceActivity>('sequence');

/**
 * sequence activity builder token
 */
export const SequenceActivityBuilderToken = new InjectAcitityBuilderToken<SequenceActivityBuilder>('sequence');


export interface SequenceConfigure extends IConfigure {
    /**
     * sequence activities.
     *
     * @type {ActivityType<any>[]}
     * @memberof IConfigure
     */
    sequence?: ActivityType<any>[];
}

/**
 * sequence activity.
 *
 * @export
 * @class SequenceActivity
 * @extends {Activity}
 */
@Task(SequenceActivityToken, SequenceActivityBuilderToken)
export class SequenceActivity extends Activity<any> {

    activites: IActivity<any>[] = [];

    run(data?: any): Promise<any> {
        let execPromise = Promise.resolve(data);
        this.activites.forEach(task => {
            execPromise = execPromise.then(pdata => task.run(pdata));
        });

        return execPromise;
    }
}

@Singleton(SequenceActivityBuilderToken)
export class SequenceActivityBuilder extends ActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: SequenceConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof SequenceActivity) {
            if (config.sequence && config.sequence.length) {
                await this.buildChildren(activity, config.sequence);
            }
        }

        return activity;
    }

    async buildChildren<T>(activity: SequenceActivity, configs: (IConfigure | Token<IActivity<T>>)[]) {
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
