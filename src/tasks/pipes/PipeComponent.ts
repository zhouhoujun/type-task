import { Task, TaskElement } from '../../core/index';
import { IPipeComponent } from './IPipeComponent';
import { ITransform } from './ITransform';

/**
 * pipe component
 * 
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@Task
export class PipeComponent extends TaskElement implements IPipeComponent<ITransform> {

}