import { ITask } from './ITask';
import { ITaskContext } from './ITaskContext';
import { TransformSource, Pipe, OutputPipe } from './types';
import { IAssets } from './IAsserts';


/**
 * pipe task.
 *
 * @export
 * @interface IPipeWork
 */
export interface IPipeTask extends ITask {

    /**
     * gulp src stream.
     *
     * @param {ITaskContext} context
     * @param {IAssets} assets
     * @param {Gulp} gulp
     * @returns {(TransformSource | Promise<TransformSource>)}
     *
     * @memberOf IPipeTask
     */
    source(context: ITaskContext, assets: IAssets): TransformSource | Promise<TransformSource>;
    /**
     * task pipe works.
     *
     * @param {ITaskContext} context
     * @param {IAssets} assets
     * @returns {Pipe[]}
     *
     * @memberOf IPipeTask
     */
    pipes(context: ITaskContext, assets: IAssets): Pipe[];

    /**
     * output pipes.
     *
     * @param {ITaskContext} [context]
     * @returns {OutputPipe[]}
     *
     * @memberOf IPipeTask
     */
    output(context: ITaskContext, assets: IAssets): OutputPipe[];
    /**
     * execute task works.
     *
     * @param {ITaskContext} context
     * @returns {Promise<any>}
     *
     * @memberOf IPipeTask
     */
    execute(context: ITaskContext): Promise<any>;
}
