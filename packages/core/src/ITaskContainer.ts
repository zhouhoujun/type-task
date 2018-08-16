import { IActivityRunner, Active, IActivity, Activity } from './core';
import { InjectToken, Type } from '@ts-ioc/core';
import { IApplicationBuilder, IApplicationExtends, InjectModuleBuilderToken } from '@ts-ioc/bootstrap';



export const WorkflowBuilderToken = new InjectModuleBuilderToken<IActivity>(Activity);


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
     * @returns {IActivityRunner<T>}
     * @memberof ITaskContainer
     */
    getWorkflow<T>(workflowId: string): IActivityRunner<T>;

    /**
     * create workflow by activity.
     *
     * @param {Active} activity
     * @param {string} [workflowId]
     * @memberof ITaskContainer
     */
    createActivity(activity: Active, workflowId?: string): Promise<IActivityRunner<any>>;

    /**
     * create workflow and bootstrap.
     *
     * @param {...Active[]} activities bootstrap activities.
     * @returns {Promise<IActivityRunner>}
     * @memberof IApplicationBuilder
     */
    bootstrap(...activities: Active[]): Promise<IActivityRunner<any>>;
}
