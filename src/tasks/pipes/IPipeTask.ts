import { ITask } from '../../core/ITask';
import { ITransform } from './ITransform';

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
     * @returns {Promise<ITransform>}
     * @memberof IPipeTask
     */
    run(data?: T): Promise<ITransform>;
}
