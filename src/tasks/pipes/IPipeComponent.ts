import { IPipeTask } from './IPipeTask';
import { ITaskComponent, ITaskProvider } from '../../core/index';
import { ITransform } from './ITransform';
import { TransformMerger } from './pipeTypes';
import { Observable } from 'rxjs/Observable';

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
export interface IPipeComponent extends ITaskComponent {
    /**
     * run task.
     *
     * @param {(ITransform | ITransform[])} [data]
     * @returns {(Observable<ITransform> | Promise<ITransform>)}
     * @memberof IPipeComponent
     */
    run(data?: ITransform | ITransform[]): Observable<ITransform> | Promise<ITransform>;

    /**
     * pipe transfrom
     *
     * @param {ITransform} data
     * @returns {(Observable<ITransform> | Promise<ITransform>)}
     * @memberof IPipeComponent
     */
    pipe(data: ITransform): Observable<ITransform> | Promise<ITransform>
}
