import { TaskComponent, ITask, IConfigure, BootsrapTask } from './core/index';
import { IContainer, Type, Providers, Token, AsyncLoadOptions, IContainerBuilder } from '@ts-ioc/core';

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
     * container builder.
     *
     * @type {IContainerBuilder}
     * @memberof ITaskContainer
     */
    containerBuilder: IContainerBuilder;

    /**
     * use modules
     *
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {this}
     * @memberof ITaskContainer
     */
    use(...modules: (Type<any> | AsyncLoadOptions)[]): this;

    /**
     * use logger
     *
     * @param {Type<any>} logger
     * @memberof ITaskContainer
     */
    useLogger(logger: Type<any>);

    /**
     * bootstarp task.
     *
     * @param {BootsrapTask} [tasks]
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof ITaskContainer
     */
    bootstrap(tasks?: BootsrapTask, ...providers: Providers[]): Promise<any>;

}
