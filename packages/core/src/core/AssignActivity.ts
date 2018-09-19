import { Activity } from './Activity';
import { Task } from '../decorators';


/**
 * assign activity.
 *
 * @export
 * @class Assign
 * @extends {Activity<T>}
 * @template T
 */
@Task
export abstract class AssignActivity<T> extends Activity<T> {

}
