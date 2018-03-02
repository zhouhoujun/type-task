import { ITaskProvider } from '../../core/index';
import { TaskSource, TaskExpress } from './pipeTypes';
import { ITaskContainer } from '../../ITaskContainer';
import { ITransform } from './ITransform';

/**
 * pipe task provider.
 * 
 * @export
 * @interface IPipeTaskProvider
 * @extends {ITaskProvider}
 */
export interface IPipeTaskProvider extends ITaskProvider {
    src?: TaskSource<ITaskContainer>;
    pipes?: TaskExpress<ITaskContainer, ITransform>
    dest?: TaskSource<ITaskContainer>;
}
