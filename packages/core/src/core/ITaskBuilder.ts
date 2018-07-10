import { InjectToken, IModuleBuilder } from '@ts-ioc/core';
import { IActivity } from './IActivity';
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
export interface ITaskBuilder extends IModuleBuilder<IActivity> {
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
