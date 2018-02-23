import { ITask } from './ITask';
import { GComponent, Token, ComponentLifecycle, AsyncLoadOptions, Type } from 'tsioc';

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
     * @param {string} [name]
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    run(name?: string): Promise<any>;
}
