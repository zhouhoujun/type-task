import { Src } from './utils/index';
import { Express, IContainer, IContainerBuilder, ObjectMap } from '@ts-ioc/core';
import { ITaskContainer } from './ITaskContainer';


/**
 * task environment.
 *
 * @export
 * @interface ITaskContext
 */
export interface ITaskContext {

    /**
     * ioc container.
     *
     * @type {IContainer}
     * @memberof ITaskContext
     */
    container: IContainer;

    /**
     * container builder.
     *
     * @type {IContainerBuilder}
     * @memberof ITaskContext
     */
    containerBuilder: IContainerBuilder;

    /**
     * task container.
     *
     * @type {ITaskContainer}
     * @memberof ITaskContext
     */
    taskContainer: ITaskContainer;

    /**
     * get run tasks in options.
     *
     * @returns {string[]}
     * @memberof ITaskContext
     */
    getRunTasks(): string[];

}
