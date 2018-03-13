import { IPipeTask } from './IPipeTask';
import { ITaskComponent, ITaskProvider } from '../../core/index';
import { ITransform } from './ITransform';
import { TransformMerger, TransformReference } from './pipeTypes';

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
    /**
     * reference transform.
     *
     * @type {TransformReference}
     * @memberof IPipeComponentProvider
     */
    reference?: TransformReference;
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
     * run task.
     *
     * @param {(ITransform | ITransform[])} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeComponent
     */
    run(data?: ITransform | ITransform[]): Promise<ITransform>;
}
