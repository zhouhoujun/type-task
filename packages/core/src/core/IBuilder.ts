import { ITaskComponent } from './ITaskComponent';
import { Token, InjectToken, IModuleBuilder, Type } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { ITask } from '.';

/**
 * builder token.
 */
export const BuilderToken = new InjectToken<ITaskBuilder<ITask>>('__TASK_Builder');

/**
 * builder.
 *
 * @export
 * @interface ITaskBuilder
 */
export interface ITaskBuilder<T extends ITask> extends IModuleBuilder<T> {

    /**
     * build task component.
     *
     * @param {(Token<T> | Type<any> | IConfigure<T>)} task  task module class or task config.
     * @param {ITaskComponent} [root] root task component
     * @returns {Promise<T>}
     * @memberof ITaskBuilder
     */
    build(task: Token<T> | Type<any> | IConfigure<T>, root?: ITaskComponent): Promise<T>;
}
