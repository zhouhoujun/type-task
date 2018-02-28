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
    taskContainer: ITaskContainer;
    build(context: IContext, root?: ITaskComponent): Promise<ITaskComponent>;
}
