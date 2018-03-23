import { ITask } from '../../core/ITask';
import { ITransform } from './ITransform';
import { Observable } from 'rxjs/Observable';

/**
 * pipe task.
 *
 * @export
 * @interface IPipeTask
 * @extends {ITask}
 * @template T
 */
export interface IPipeTask<T> extends ITask {
    /**
     * pipe task
     *
     * @param {T} [data]
     * @returns {(Observable<ITransform> | Promise<ITransform>)}
     * @memberof IPipeTask
     */
    run(data?: T): Observable<ITransform> | Promise<ITransform>;
}
