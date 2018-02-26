import { TaskComponent, ITask } from './core/index';
import { IContainer, Type, Providers, Token, AsyncLoadOptions } from 'tsioc';

/**
 * task container.
 *
 * @export
 * @interface ITaskContainer
 * @extends {TaskComponent}
 */
export interface ITaskContainer {
    /**
     * root of task environment.
     *
     * @type {string}
     * @memberof ITaskContainer
     */
    rootPath: string;

    /**
     * ioc container.
     *
     * @type {IContainer}
     * @memberof ITaskContainer
     */
    container: IContainer;


    /**
     * use modules
     *
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {this}
     * @memberof ITaskContainer
     */
    use(...modules: (Type<any> | AsyncLoadOptions)[]): this;

    /**
     * bootstarp.
     */
    bootstrap(type: Token<ITask>, ...providers: Providers[]): Promise<any>;

}
