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
export interface IPipeComponent<T> extends ITaskComponent {
    /**
     * run task.
     * 
     * @param {T} [data] 
     * @returns {Promise<ITransform>} 
     * @memberof IPipeComponent
     */
    run(data?: T): Promise<ITransform>;
}