import { IPipeTask } from './IPipeTask';
import { ITaskComponent } from '../../core/index';
import { ITransform } from './ITransform';

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
