import { TaskComponent, ITask, IConfigure, ITaskRunner, TaskType } from './core/index';
import { IContainer, Type, Providers, Token, IContainerBuilder, InjectToken, IModuleBuilder, IApplicationBuilder } from '@ts-ioc/core';


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
export interface ITaskContainer extends IApplicationBuilder<ITask> {

    /**
     * get root path.
     *
     * @returns {string}
     * @memberof ITaskContainer
     */
    getRootPath(): string;
    /**
     * use log aspect.
     *
     * @param {Type<any>} logAspect
     * @returns {this}
     * @memberof ITaskContainer
     */
    useLog(logAspect: Type<any>): this;

    /**
     * bootstrap app via main module.
     *
     * @param {(TaskType<ITask>)} bootModule bootstrap module.
     * @returns {Promise<ITaskRunner>}
     * @memberof IApplicationBuilder
     */
    bootstrap(bootModule: TaskType<ITask>): Promise<ITaskRunner>;
}
