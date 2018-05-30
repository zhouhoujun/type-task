import { IPipeTask } from './IPipeTask';
import { ITaskComponent, ITaskProvider, Src } from '@taskp/core';
import { ITransform } from './ITransform';
import { TransformMerger, TransformSource } from './pipeTypes';

/**
 * pipe component provider.
 *
 * @export
 * @interface IPipeComponentProvider
 * @extends {ITaskProvider}
 */
export interface IPipeComponentProvider extends ITaskProvider {
    /**
     * merger transform.
     *
     * @type {TransformMerger}
     * @memberof IPipeComponentProvider
     */
    merger?: TransformMerger;
}

/**
 * pipe component.
 *
 * @export
 * @interface IPipeComponent
 * @extends {ITaskComponent}
 * @template T
 */
export interface IPipeComponent extends ITaskComponent {

    /**
     * pipe task run enviroment.
     */
    context: IPipeTaskContext;
    /**
     * run task.
     *
     * @param {(Src | ITransform | ITransform[])} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeComponent
     */
    run(data?: Src | ITransform | ITransform[]): Promise<ITransform>;
}
