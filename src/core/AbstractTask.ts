import { Abstract, Inject } from 'tsioc';
import { ITask } from './ITask';
import { IEnvironment } from '../IEnvironment';
import { taskSymbols } from '../utils/index';

@Abstract()
export abstract class AbstractTask implements ITask {

    @Inject(taskSymbols.IEnvironment)
    enviroment: IEnvironment;

    constructor(public name: string) {

    }

    abstract run(): Promise<any>;
}
