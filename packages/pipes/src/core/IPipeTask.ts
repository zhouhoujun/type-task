import { ITask } from '@taskp/core';
import { ITransform } from './ITransform';
import { InjectToken } from '@ts-ioc/core';

export const PipeToken = new InjectToken<IPipeTask>('__Task_Pipe');

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
