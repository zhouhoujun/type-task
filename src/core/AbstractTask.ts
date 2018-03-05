import { Abstract, Inject } from 'tsioc';
import { ITask } from './ITask';
import { ITaskContext } from '../ITaskContext';
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
     * @type {ITaskContext}
     * @memberof AbstractTask
     */
    @Inject(taskSymbols.ITaskContext)
    context: ITaskContext;

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
