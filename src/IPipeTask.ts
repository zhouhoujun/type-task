import { ITask } from './ITask';
import { ITaskContext } from './ITaskContext';
import { IAssertDist } from './IAssertDist';
import { TransformSource, Pipe, OutputPipe } from './types';


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
     * @param {IAssertDist} dist
     * @param {Gulp} gulp
     * @returns {(TransformSource | Promise<TransformSource>)}
     *
     * @memberOf IPipeTask
     */
    source(context: ITaskContext, dist: IAssertDist): TransformSource | Promise<TransformSource>;
    /**
     * task pipe works.
     *
     * @param {ITaskContext} context
     * @param {IAssertDist} dist
     * @returns {Pipe[]}
     *
     * @memberOf IPipeTask
     */
    pipes(context: ITaskContext, dist: IAssertDist): Pipe[];

    /**
     * output pipes.
     *
     * @param {ITaskContext} [context]
     * @returns {OutputPipe[]}
     *
     * @memberOf IPipeTask
     */
    output(context: ITaskContext, dist: IAssertDist): OutputPipe[];
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
