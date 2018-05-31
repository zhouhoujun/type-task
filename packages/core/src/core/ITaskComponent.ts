import { ITask } from './ITask';
import { GComponent, Token, ComponentLifecycle, Type, Provider, Providers, ModuleType, IContainer } from '@ts-ioc/core';
import { RunWay } from './RunWay';
import { IConfigure } from './IConfigure';

/**
 * Task Component.
 *
 * @export
 * @interface ITaskComponent
 * @extends {GComponent<TaskComponent>}
 */
export interface ITaskComponent extends GComponent<ITaskComponent>, ITask, ComponentLifecycle {

    /**
     * ioc container.
     *
     * @type {IContainer}
     * @memberof ITaskComponent
     */
    container: IContainer;

    /**
     * get root.
     *
     * @returns {ITaskComponent}
     * @memberof ITaskComponent
     */
    getRoot(): ITaskComponent;

}
