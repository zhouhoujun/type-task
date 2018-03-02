import { Task, TaskElement, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { IPipeTask } from './IPipeTask';
import { Src } from '../../utils/index';
import { ITransform } from './ITransform';
import { TaskSource } from './pipeTypes';
import { isFunction } from 'tsioc';
import { IEnvironment } from '../../IEnvironment';


@Task
export class PipeSource extends AbstractTask implements IPipeTask<Src> {

    constructor(name: string, private src: TaskSource<IEnvironment>) {
        super(name);
    }

    run(data?: Src): Promise<ITransform> {
        let src = isFunction(this.src)? this.src(this.enviroment): this.src;
        return null;
    }
}