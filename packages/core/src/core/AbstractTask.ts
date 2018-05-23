import { Abstract, Inject } from '@ts-ioc/core';
import { ITask } from './ITask';

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
