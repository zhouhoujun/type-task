import { ITask } from './ITask';
import { GComponent, ComponentLifecycle } from '@ts-ioc/core';

/**
 * Task Component.
 *
 * @export
 * @interface ITaskComponent
 * @extends {GComponent<TaskComponent>}
 */
export interface ITaskComponent extends GComponent<ITaskComponent>, ITask, ComponentLifecycle {

    /**
     * get root.
     *
     * @returns {ITaskComponent}
     * @memberof ITaskComponent
     */
    getRoot(): ITaskComponent;

}
