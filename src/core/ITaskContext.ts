import { AsyncLoadOptions, Type } from 'tsioc';
import { RunWay } from '../pipes';
import { TaskComponent } from './TaskComponent';
import { IContext } from './IContext';

export interface ITaskContext extends TaskComponent {

    
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
