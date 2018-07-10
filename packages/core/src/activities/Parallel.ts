import { Task, IActivity, OnTaskInit, IConfigure, InjectAcitityToken } from '../core';
import { Activity } from './Activity';


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
 * @implements {OnTaskInit}
 */
@Task(ParallelActivityToken)
export class ParallelActivity extends Activity implements OnTaskInit {

    activites: IActivity[] = [];
    onTaskInit(config: IConfigure) {
        this.activites = this.activites || [];
    }

    run(data?: any): Promise<any> {
        return Promise.all(this.activites.map(task => task.run(data)));
    }

}
