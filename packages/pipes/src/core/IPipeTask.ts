import { ITask } from '@taskp/core';
import { ITransform } from './ITransform';
import { IPipeConfigure } from './IPipeConfigure';
/**
 * pipe task.
 *
 * @export
 * @interface IPipeTask
 * @extends {ITask}
 * @template T
 */
export interface IPipeTask extends ITask {

    /**
     * pipe task
     *
     * @param {any} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeTask
     */
    run(data?: any): Promise<ITransform>;
}
