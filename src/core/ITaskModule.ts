import { ITask } from './ITask';
import { IContext } from './IContext';

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
     * @type {IContext}
     * @memberof ITaskModule
     */
    context?: IContext;
}
