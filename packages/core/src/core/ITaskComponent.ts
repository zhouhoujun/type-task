import { ITask } from './ITask';
import { GComponent, Token, ComponentLifecycle, Type, Provider, Providers, ModuleType, IContainer } from '@ts-ioc/core';
import { RunWay } from './RunWay';
import { ITaskModule } from './ITaskModule';
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

    getRoot(): ITaskComponent;

}
