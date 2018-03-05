import { ITaskComponent } from './ITaskComponent';
import { Token } from 'tsioc';
import { IConfigure } from './IConfigure';
import { ITaskContext } from '../ITaskContext';


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
     * @type {ITaskContext}
     * @memberof IBuilder
     */
    context: ITaskContext;
    /**
     * build task component.
     *
     * @param {IConfigure} config
     * @param {ITaskComponent} [root]
     * @returns {Promise<ITaskComponent>}
     * @memberof IBuilder
     */
    build(config: IConfigure, root?: ITaskComponent): Promise<ITaskComponent>;
}
