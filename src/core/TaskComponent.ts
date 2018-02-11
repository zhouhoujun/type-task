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
     * filter task to run.
     *
     * @param {Type<any>[]} tasks
     * @returns {Type<any>[]}
     * @memberof TaskComponent
     */
    filterTask(tasks: Type<any>[]): Type<any>[];


    /**
     * sort task run order.
     *
     * @param {Type<any>[]} tasks
     * @returns {Type<any>[]}
     * @memberof TaskComponent
     */
    orderTask(tasks: Type<any>[]): Type<any>[];


    /**
     * get execution data.
     *
     * @param {Type<any>} task
     * @returns {*}
     * @memberof TaskComponent
     */
    getExecData(task: Type<any>): any;

    /**
     * run task
     *
     * @param {string} [taskname]
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    run(taskname?: string): Promise<any>;
}
