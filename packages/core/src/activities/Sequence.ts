import { Task, IActivity, IConfigure, InjectAcitityToken, InjectAcitityBuilderToken, ActivityBuilder, Activity, ActivityResultType } from '../core';
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
     * @type {ActivityResultType<any>[]}
     * @memberof IConfigure
     */
    sequence?: ActivityResultType<any>[];
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

    activites: IActivity[] = [];

    run(data?: any): Promise<any> {
        let execPromise = this.begin(data);
        this.activites.forEach(task => {
            execPromise = execPromise.then(pdata => task.run(pdata));
        });

        return execPromise.then(result => this.end(result));
    }

    protected async begin(data?: any): Promise<any> {
        return data;
    }

    protected async end(data?: any): Promise<any> {
        return data;
    }
}

@Singleton(SequenceActivityBuilderToken)
export class SequenceActivityBuilder extends ActivityBuilder {

    async buildStrategy(activity: IActivity, config: SequenceConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof SequenceActivity) {
            if (config.sequence && config.sequence.length) {
                await this.buildChildren(activity, config.sequence);
            }
        }

        return activity;
    }

    async buildChildren(activity: SequenceActivity, configs: (IConfigure | Token<IActivity>)[]) {
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
