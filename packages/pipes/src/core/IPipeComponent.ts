import { IPipeTask } from './IPipeTask';
import { ITaskComponent, ITaskProvider, Src, ITaskRunner } from '@taskp/core';
import { ITransform } from './ITransform';
import { TransformType, TransformMerger } from './pipeTypes';
import { IPipeContext } from './ITaskContext';
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
     * get stream merger.
     *
     * @returns {TransformMerger}
     * @memberof IPipeComponent
     */
    getMerger(): TransformMerger;
}
