import { Task, IActivity, OnTaskInit, IConfigure, InjectAcitityToken } from '../core';
import { Activity } from './Activity';


/**
 *  sequence activity token
 */
export const SequenceActivityToken = new InjectAcitityToken<SequenceActivity>('sequence');


/**
 * sequence activity.
 *
 * @export
 * @class SequenceActivity
 * @extends {Activity}
 * @implements {OnTaskInit}
 */
@Task(SequenceActivityToken)
export class SequenceActivity extends Activity implements OnTaskInit {

    activites: IActivity[] = [];
    onTaskInit(config: IConfigure) {
        this.activites = this.activites || [];
    }

    run(data?: any): Promise<any> {
        let execPromise = Promise.resolve(data);
        this.activites.forEach(task => {
            execPromise = execPromise.then(pdata => task.run(pdata));
        });

        return execPromise;
    }

}
