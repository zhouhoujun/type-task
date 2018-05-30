import { TaskComponent, ITask, IConfigure } from './core/index';
import { IContainer, Type, Providers, Token, IContainerBuilder, InjectToken, IModuleBuilder, IApplicationBuilder } from '@ts-ioc/core';
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
export interface ITaskContainer extends IApplicationBuilder<ITask> {
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
     * @param {(Token<ITask> | Type<any> | IConfigure)} bootModule bootstrap module.
     * @returns {Promise<any>}
     * @memberof IApplicationBuilder
     */
    bootstrap(bootModule: Token<ITask> | Type<any> | IConfigure): Promise<ITask>;
}
