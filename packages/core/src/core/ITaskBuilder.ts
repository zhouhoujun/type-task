import { InjectToken, IModuleBuilder } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IConfigure, TaskType } from './IConfigure';

/**
 * builder token.
 */
export const TaskBuilderToken = new InjectToken<ITaskBuilder>('__TASK_Builder');

/**
 * builder.
 *
 * @export
 * @interface ITaskBuilder
 */
export interface ITaskBuilder extends IModuleBuilder<IActivity> {

    /**
     * build
     *
     * @template T
     * @param {TaskType<IActivity>} task
     * @param {string} uuid
     * @returns {Promise<T>}
     * @memberof ITaskBuilder
     */
    build<T extends IActivity>(task: TaskType<IActivity>, uuid: string): Promise<T>;
    /**
     * bundle task config.
     *
     * @param {IActivity} taskInst
     * @param {IConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof ITaskBuilder
     */
    buildWithConfigure(taskInst: IActivity, config: IConfigure): Promise<IActivity>
}
