import { IActivity, IActivityRunner, ActivityType } from './core';
import { InjectToken } from '@ts-ioc/core';
import { IApplicationBuilder } from '@ts-ioc/bootstrap';

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
export interface ITaskContainer extends IApplicationBuilder<IActivityRunner<IActivity>> {

    // /**
    //  * build activity runner.
    //  *
    //  * @param {...ActivityType<IActivity>[]} tasks
    //  * @returns {Promise<IActivityRunner<any>>}
    //  * @memberof ITaskContainer
    //  */
    // build(...tasks: ActivityType<IActivity>[]): Promise<IActivityRunner<any>>;

    /**
     * create workflow
     *
     * @param {...ActivityType<IActivity>[]} tasks
     * @returns {Promise<IActivityRunner>}
     * @memberof ITaskContainer
     */
    createWorkflow(...tasks: ActivityType<IActivity>[]): Promise<IActivityRunner<IActivity>>;

    // /**
    //  * bootstrap app via main module.
    //  *
    //  * @param {...ActivityType<IActivity>[]} tasks bootstrap tasks.
    //  * @returns {Promise<IActivityRunner>}
    //  * @memberof IApplicationBuilder
    //  */
    // bootstrap(...tasks: ActivityType<IActivity>[]): Promise<IActivityRunner<any>>;
}
