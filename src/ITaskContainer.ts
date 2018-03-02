import { TaskComponent, ITask, IContext } from './core/index';
import { IContainer, Type, Providers, Token, AsyncLoadOptions, IContainerBuilder } from 'tsioc';

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
     * @param {(IContext | Token<any>)} task
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof ITaskContainer
     */
    bootstrap(task: IContext | Token<any>, ...providers: Providers[]): Promise<any>;

}
