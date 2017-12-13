import { ICustomPipe } from './ICustomPipe';
import { TransformSource, Pipe, OutputPipe } from './types';
import { ITaskContext } from './ITaskContext';
import { IAssertDist } from './IAssertDist';
import { IOutputPipe } from './IOutputPipe';

/**
 * pipe works.
 *
 * @export
 * @interface IPipeOption
 * @extends {ICustomPipe}
 */
export interface IPipeOption extends ICustomPipe {
    /**
     * task source stream config.
     *
     * @memberof IPipeOption
     */
    source?: TransformSource | ((ctx?: ITaskContext, dist?: IAssertDist) => TransformSource)
    /**
     * task pipe works.
     *
     * @memberof IDynamicTaskOption
     */
    pipes?: Pipe[] | ((ctx?: ITaskContext, dist?: IAssertDist) => Pipe[]);

    /**
     * output pipe task
     *
     * @memberof OutputPipe
     */
    output?: OutputPipe[] | ((ctx?: ITaskContext, dist?: IAssertDist) => OutputPipe[]);
}

