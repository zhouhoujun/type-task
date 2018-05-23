import { TaskComponent, ITask, IConfigure, BootstrapTask } from './core/index';
import { IContainer, Type, Providers, Token, IContainerBuilder, InjectToken, IModuleBuilder } from '@ts-ioc/core';
import { TaskType } from './utils/index';


/**
 * TaskContainer token.
 */
export const TaskContainerToken = new InjectToken<ITaskContainer>('__TASK_TaskContainer');

/**
 * task container.
 *
 * @export
 * @interface ITaskContainer
 * @extends {TaskComponent}
 */
export interface ITaskContainer extends IModuleBuilder<IConfigure> {
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
     * @param {Type<T>} [task]
     * @returns {Promise<T>}
     * @memberof ITaskContainer
     */
    bootstrap<T extends ITask>(task?: Type<T>): Promise<T>;

}
