import { TaskComponent, ITask, IConfigure } from './core/index';
import { IContainer, Type, Providers, Token, IContainerBuilder, InjectToken, IModuleBuilder, IApplicationBuilder } from '@ts-ioc/core';
import { TaskType } from './utils/index';


/**
 * TaskContainer token.
 */
export const TaskContainerToken = new InjectToken<ITaskContainer<ITask>>('__TASK_TaskContainer');

/**
 * task container.
 *
 * @export
 * @interface ITaskContainer
 * @extends {TaskComponent}
 */
export interface ITaskContainer<T extends ITask> extends IApplicationBuilder<T> {

}
