import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, SequenceConfigure, ActivityType, IActivityContext, ContextActivity } from '../core';

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
export class SequenceActivity extends ContextActivity {

    activities: IActivity[] = [];

    async onActivityInit(config: SequenceConfigure): Promise<any> {
        this.activities = this.activities || [];
        await super.onActivityInit(config);
        if (config.sequence && config.sequence.length) {
            await this.buildChildren(this, config.sequence);
        }
    }

    add(activity: IActivity) {
        this.activities.push(activity);
    }

    async buildChildren(activity: SequenceActivity, configs: ActivityType<IActivity>[]) {
        let sequence = await Promise.all(configs.map(cfg => this.buildActivity(cfg)));
        activity.activities = sequence;
        return activity;
    }

    protected async execute(): Promise<void> {
        let execPromise = Promise.resolve(this.getContext());
        this.activities.forEach(task => {
            execPromise = execPromise.then(pdata => task.run(pdata));
        });
        await execPromise;
    }
}
