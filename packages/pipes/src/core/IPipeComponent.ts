import { IPipeTask } from './IPipeTask';
import { ITaskComponent, ITaskProvider, Src, ITaskRunner } from '@taskp/core';
import { ITransform } from './ITransform';
import { TransformType, TransformMerger, TransformExpress, TransformMergerExpress } from './pipeTypes';
import { IPipeContext } from './IPipeContext';
import { IPipeConfigure } from './IPipeConfigure';
import { Token, ObjectMap } from '@ts-ioc/core';


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
     * pipe task config.
     *
     * @type {IPipeConfigure}
     * @memberof IPipeTask
     */
    config: IPipeConfigure;

    /**
     * context.
     *
     * @type {IPipeContext}
     * @memberof ITaskContext
     */
    context: IPipeContext;

    /**
     * run task.
     *
     * @param {any} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeComponent
     */
    run(data?: any): Promise<ITransform>;

    /**
     * get pipes.
     *
     * @returns {TransformType[]}
     * @memberof IPipeComponent
     */
    getPipes(): TransformType[];

    /**
     * set pipes.
     *
     * @param {TransformExpress} pipes
     * @memberof IPipeComponent
     */
    setPipes(pipes: TransformExpress);

    /**
     * get stream merger.
     *
     * @returns {TransformMerger}
     * @memberof IPipeComponent
     */
    getMerger(): TransformMerger;

    /**
     * set merger.
     *
     * @param {TransformMergerExpress} merger
     * @memberof IPipeComponent
     */
    setMerger(merger: TransformMergerExpress)
}
