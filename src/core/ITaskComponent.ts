import { ITask } from './ITask';
import { GComponent, Token, ComponentLifecycle, Type, Provider, Providers } from '@ts-ioc/core';
import { RunWay } from './RunWay';
import { ITaskModule } from './ITaskModule';
import { IConfigure } from './IConfigure';
import { TaskType } from '../utils/index';

/**
 * Task Component.
 *
 * @export
 * @interface ITaskComponent
 * @extends {GComponent<TaskComponent>}
 */
export interface ITaskComponent extends GComponent<ITaskComponent>, ITaskModule, ComponentLifecycle {

    /**
     * children run way.
     *
     * @type {RunWay}
     * @memberof ITaskComponent
     */
    runWay: RunWay;

    /**
     * get component config.
     *
     * @returns {IConfigure}
     * @memberof ITaskComponent
     */
    getConfig(): IConfigure;

    /**
     * use modules
     *
     * @param {...TaskType[]} modules
     * @returns {this}
     * @memberof ITaskComponent
     */
    use(...modules: TaskType[]): this;
}
