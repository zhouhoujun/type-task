import { GComponent, Token, ComponentLifecycle, AsyncLoadOptions } from 'tsioc';
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
     * use modules
     *
     * @param {AsyncLoadOptions} modules
     * @returns {this}
     * @memberof TaskComponent
     */
    use(modules: AsyncLoadOptions): this;

    /**
     * run task
     *
     * @param {string} [taskname]
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    run(taskname?: string): Promise<any>;
}
