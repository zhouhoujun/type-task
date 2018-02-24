import { TaskComponent } from './core/index';
import { IContainer } from 'tsioc';

/**
 * task container.
 *
 * @export
 * @interface ITaskContainer
 * @extends {TaskComponent}
 */
export interface ITaskContainer extends TaskComponent {
    /**
     * root of task environment.
     *
     * @type {string}
     * @memberof ITaskContainer
     */
    rootPath: string;
    /**
     * root compoment.
     *
     * @type {TaskComponent}
     * @memberof ITaskContainer
     */
    root: TaskComponent;
    /**
     * ioc container.
     *
     * @type {IContainer}
     * @memberof ITaskContainer
     */
    container: IContainer;
}
