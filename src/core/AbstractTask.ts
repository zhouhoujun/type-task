import { Abstract, Inject } from 'tsioc';
import { ITask } from './ITask';
import { IEnvironment } from '../IEnvironment';
import { taskSymbols } from '../utils/index';

/**
 * abstract task.
 *
 * @export
 * @abstract
 * @class AbstractTask
 * @implements {ITask}
 */
@Abstract()
export abstract class AbstractTask implements ITask {

    /**
     * task environment.
     *
     * @type {IEnvironment}
     * @memberof AbstractTask
     */
    @Inject(taskSymbols.IEnvironment)
    enviroment: IEnvironment;

    constructor(public name: string) {

    }

    /**
     * run task.
     * 
     * @abstract
     * @param {*} [data] 
     * @returns {Promise<any} 
     * @memberof AbstractTask
     */
    abstract run(data?: any): Promise<any>;
}
