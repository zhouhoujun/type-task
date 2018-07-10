import { IActivity } from './IActivity';
import { GComponent, ComponentLifecycle } from '@ts-ioc/core';

/**
 * Task Component.
 *
 * @export
 * @interface ITaskComponent
 * @extends {GComponent<TaskComponent>}
 */
export interface ITaskComponent extends GComponent<ITaskComponent>, IActivity, ComponentLifecycle {

    /**
     * get root.
     *
     * @returns {ITaskComponent}
     * @memberof ITaskComponent
     */
    getRoot(): ITaskComponent;

}
