import { IWorkflow, Active } from './core';
import { InjectToken, Type } from '@ts-ioc/core';
import { IApplicationBuilder, IApplicationExtends } from '@ts-ioc/bootstrap';

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
export interface ITaskContainer extends IApplicationExtends {

    useLog(logAspect: Type<any>): this;

    getBuilder(): IApplicationBuilder<any>;

    /**
     * get workflow.
     *
     * @template T
     * @param {string} workflowId
     * @returns {IWorkflow<T>}
     * @memberof ITaskContainer
     */
    getWorkflow<T>(workflowId: string): IWorkflow<T>;

    /**
     * create workflow.
     *
     * @param {Active} activity
     * @param {string} [workflowId]
     * @memberof ITaskContainer
     */
    createWorkflow(activity: Active, workflowId?: string);

    /**
     * create workflow and bootstrap.
     *
     * @param {...Active[]} activities bootstrap activities.
     * @returns {Promise<IWorkflow>}
     * @memberof IApplicationBuilder
     */
    bootstrap(...activities: Active[]): Promise<IWorkflow<any>>;
}
