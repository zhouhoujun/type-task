import { ITaskComponent } from './ITaskComponent';
import { Token, InjectToken, IModuleBuilder, Type } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { ITask } from '.';

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
