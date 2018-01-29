import { GComponent, Token, ComponentLifecycle } from 'tsioc';
import { TaskContext } from './TaskContext';
import { ITask } from './ITask';


/**
 * Task Component.
 *
 * @export
 * @interface TaskComponent
 * @extends {GComponent<TaskComponent>}
 */
export interface TaskComponent extends GComponent<TaskComponent>, ITask, ComponentLifecycle {
    /**
     * run task
     *
     * @param {string} [taskname]
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    run(taskname?: string): Promise<any>;
}
