import { InjectToken, IModuleBuilder } from '@ts-ioc/core';
import { ITask } from './ITask';

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

}
