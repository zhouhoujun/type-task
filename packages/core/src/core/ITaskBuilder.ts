import { InjectToken, IModuleBuilder } from '@ts-ioc/core';
import { ITask } from './ITask';
import { IConfigure } from './IConfigure';

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
export interface ITaskBuilder extends IModuleBuilder<ITask> {
    /**
     * bundle task config.
     *
     * @param {ITask} taskInst
     * @param {IConfigure} config
     * @returns {Promise<ITask>}
     * @memberof ITaskBuilder
     */
    buildWithConfigure(taskInst: ITask, config: IConfigure): Promise<ITask>
}
