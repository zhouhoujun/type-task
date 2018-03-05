import { ITask } from './ITask';
import { IConfigure } from './IConfigure';

/**
 * task module.
 *
 * @export
 * @interface ITaskModule
 * @extends {ITask}
 */
export interface ITaskModule extends ITask {
    /**
     * context
     *
     * @type {IConfigure}
     * @memberof ITaskModule
     */
    config?: IConfigure;
}
