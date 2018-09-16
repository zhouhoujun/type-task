import { Activity } from './Activity';
import { Task } from '../decorators';

@Task
export class ExpressionActivity<T> extends Activity<T> {

}
