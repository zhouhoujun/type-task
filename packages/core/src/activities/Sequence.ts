import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Activity, SequenceConfigure, ActivityType } from '../core';
import { Token, isToken } from '@ts-ioc/core';


/**
 * sequence activity token
 */
export const SequenceActivityToken = new InjectAcitityToken<SequenceActivity>('sequence');

/**
 * sequence activity.
 *
 * @export
 * @class SequenceActivity
 * @extends {Activity}
 */
@Task(SequenceActivityToken)
export class SequenceActivity extends Activity<any> {

    activites: IActivity[];

    async onActivityInit(config: SequenceConfigure): Promise<any> {
        this.activites = this.activites || [];
        await super.onActivityInit(config);
        if (config.sequence && config.sequence.length) {
            await this.buildChildren(this, config.sequence);
        }
    }

    async buildChildren(activity: SequenceActivity, configs: ActivityType<IActivity>[]) {
        let sequence = await Promise.all(configs.map(cfg => this.buildActivity(cfg)));
        activity.activites = sequence;
        return activity;
    }

    protected execute(data?: any, execute?: IActivity): Promise<any> {
        let execPromise = Promise.resolve(data);
        this.activites.forEach(task => {
            execPromise = execPromise.then(pdata => task.run(pdata));
        });
        return execPromise;
    }
}
