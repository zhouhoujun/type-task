import { IPipeTask } from './IPipeTask';
import { ITaskComponent } from '@taskp/core';
import { ITransform } from './ITransform';
import { TransformType, TransformMerger } from './pipeTypes';
import { IPipeContext } from './IPipeContext';


/**
 * pipe component.
 *
 * @export
 * @interface IPipeComponent
 * @extends {ITaskComponent}
 * @template T
 */
export interface IPipeComponent extends ITaskComponent, IPipeTask {

    /**
     * context.
     *
     * @type {IPipeContext}
     * @memberof ITaskContext
     */
    context: IPipeContext;

    /**
     * await pipe completed.
     *
     * @type {boolean}
     * @memberof IPipeComponent
     */
    awaitPiped: boolean;

    /**
    * task pipes.
    *
    * @returns {TransformType[]}
    * @memberof IPipeComponent
    */
    pipes: TransformType[];


    /**
     * stream merger.
     *
     * @returns {TransformMerger}
     * @memberof IPipeComponent
     */
    merger: TransformMerger;

    /**
     * run task.
     *
     * @param {any} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeComponent
     */
    run(data?: any): Promise<ITransform>;

}
