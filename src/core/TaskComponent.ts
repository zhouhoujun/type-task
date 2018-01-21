import { IComponent, Token } from 'tsioc';
import { TaskContext } from './TaskContext';


/**
 * Task Component.
 *
 * @export
 * @interface TaskComponent
 * @extends {IComponent}
 */
export interface TaskComponent extends IComponent {

    addTask(...task: (TaskComponent | Token<any>)[]);

    /**
     * get run context.
     *
     * @returns {TaskContext}
     * @memberof TaskComponent
     */
    getContext(): TaskContext;

    /**
     * run task.
     *
     * @param {TaskContext} context
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    run(taskname?: string): Promise<any>;
}
