import { Abstract, Inject } from '@ts-ioc/core';
import { ITask } from './ITask';
import { ITaskContext, TaskContextToken } from '../ITaskContext';

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
    @Inject(TaskContextToken)
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
