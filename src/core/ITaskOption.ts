import { ITask } from './ITask';
import { ITaskProvider } from './ITaskProvider';
import { Type } from 'tsioc';


export interface ITaskOption<T extends ITask> {

    /**
     * task providers
     *
     * @type {ITaskProvider}
     * @memberof IConfigure
     */
    providers?: ITaskProvider;

    /**
     * boostrap tasks.
     *
     * @type {Type<T>}
     * @memberof IContext
     */
    task?: Type<T>;
}
