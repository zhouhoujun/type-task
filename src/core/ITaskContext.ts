import { AsyncLoadOptions, Type } from 'tsioc';
import { ITaskComponent } from './ITaskComponent';
import { IContext } from './IContext';

export interface ITaskContext extends ITaskComponent {

    /**
     * context
     *
     * @type {IContext}
     * @memberof TaskComponent
     */
    context?: IContext;

    /**
     * get context.
     *
     * @template T
     * @returns {T}
     * @memberof ITaskContext
     */
    getContext<T extends IContext>(): T;
}
