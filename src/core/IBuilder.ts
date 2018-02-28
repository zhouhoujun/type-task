import { ITaskComponent } from './ITaskComponent';
import { Token } from 'tsioc';
import { IContext } from './IContext';
import { ITaskContainer } from '../ITaskContainer';


/**
 * builder.
 *
 * @export
 * @interface IBuilder
 */
export interface IBuilder {
    /**
     * task container.
     *
     * @type {ITaskContainer}
     * @memberof IBuilder
     */
    taskContainer: ITaskContainer;
    /**
     * build task component.
     *
     * @param {IContext} context
     * @param {ITaskComponent} [root]
     * @returns {Promise<ITaskComponent>}
     * @memberof IBuilder
     */
    build(context: IContext, root?: ITaskComponent): Promise<ITaskComponent>;
}
