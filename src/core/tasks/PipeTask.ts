import { TaskElement } from '../TaskElement';
import { Task } from '../decorators/index';
import { ITaskProvider } from '../ITaskProvider';
import { ITaskContainer } from '../../ITaskContainer';
import { Src } from '../../utils';

export interface IPipeTaskProvider extends ITaskProvider {
    src?: (src: Src) => NodeJS.ReadableStream[];
    pipes: ((container: ITaskContainer) => NodeJS.ReadableStream[]);
}

@Task
export class PipeTask extends TaskElement {

}