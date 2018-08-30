import { Activity } from './Activity';
import { Task } from '../decorators';

@Task
export class ExpressionActivity<T> extends Activity<T> {

}


/**
 * assign activity.
 *
 * @export
 * @class Assign
 * @extends {Activity<T>}
 * @template T
 */
@Task
export class AssignActivity<T> extends Activity<T> {

}
