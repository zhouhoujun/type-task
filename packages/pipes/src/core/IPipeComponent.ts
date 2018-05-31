import { IPipeTask } from './IPipeTask';
import { ITaskComponent, ITaskProvider, Src } from '@taskp/core';
import { ITransform } from './ITransform';
import { TransformMerger, TransformSource } from './pipeTypes';
import { ITaskContext } from './ITaskContext';
import { IPipeConfigure } from './IPipeConfigure';

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
     * @type {ITaskContext}
     * @memberof ITaskContext
     */
    context: ITaskContext;

    /**
     * run task.
     *
     * @param {any} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeComponent
     */
    run(data?: any): Promise<ITransform>;
}
