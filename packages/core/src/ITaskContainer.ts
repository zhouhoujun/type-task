import { TaskComponent, ITask, IConfigure, BootstrapTask } from './core/index';
import { IContainer, Type, Providers, Token, IContainerBuilder, InjectToken, IModuleBuilder } from '@ts-ioc/core';
import { TaskType } from './utils/index';


/**
 * TaskContainer token.
 */
export const TaskContainerToken = new InjectToken<ITaskContainer<IConfigure>>('__TASK_TaskContainer');

/**
 * task container.
 *
 * @export
 * @interface ITaskContainer
 * @extends {TaskComponent}
 */
export interface ITaskContainer<T extends IConfigure> extends IModuleBuilder<IConfigure> {
    /**
     * root of task environment.
     *
     * @type {string}
     * @memberof ITaskContainer
     */
    rootPath: string;

    /**
     * bootstrap task.
     *
     * @param {(Token<ITask> | T)} [task]
     * @returns {Promise<T>}
     * @memberof ITaskContainer
     */
    bootstrap(task?: Token<ITask> | T): Promise<ITask>;

}
