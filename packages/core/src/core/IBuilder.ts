import { ITaskComponent } from './ITaskComponent';
import { Token, InjectToken, IModuleBuilder, Type } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { ITask } from '.';

/**
 * builder token.
 */
export const BuilderToken = new InjectToken<ITaskBuilder>('__TASK_Builder');

/**
 * builder.
 *
 * @export
 * @interface ITaskBuilder
 */
export interface ITaskBuilder {

    /**
     * build task component.
     *
     * @param {(Token<T> | Type<any> | IConfigure)} task  task module class or task config.
     * @param {ITaskComponent} [root] root task component
     * @returns {Promise<T>}
     * @memberof ITaskBuilder
     */
    build<T extends ITaskComponent>(task: Token<T> | Type<any> | IConfigure, root?: ITaskComponent): Promise<T>;
}
