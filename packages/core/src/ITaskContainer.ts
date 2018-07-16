import { IActivity, ITaskRunner, ActivityType } from './core';
import { Type, InjectToken, IApplicationBuilder } from '@ts-ioc/core';


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
export interface ITaskContainer extends IApplicationBuilder<IActivity<any>> {

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
     * create workflow
     *
     * @param {...ActivityType<IActivity>[]} tasks
     * @returns {Promise<ITaskRunner>}
     * @memberof ITaskContainer
     */
    createWorkflow(...tasks: ActivityType<IActivity<any>>[]): Promise<ITaskRunner<any>>;

    /**
     * bootstrap app via main module.
     *
     * @param {...ActivityType<IActivity>[]} tasks bootstrap tasks.
     * @returns {Promise<ITaskRunner>}
     * @memberof IApplicationBuilder
     */
    bootstrap(...tasks: ActivityType<IActivity<any>>[]): Promise<ITaskRunner<any>>;
}
