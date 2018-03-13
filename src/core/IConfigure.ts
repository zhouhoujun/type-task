import { AsyncLoadOptions, Type, Token, Providers, ObjectMap } from 'tsioc';
import { ITaskProvider, TaskProvider } from './ITaskProvider';
import { IBuilder } from './IBuilder';
import { TaskType } from '../utils/index';
import { ITask } from './ITask';

/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IConfigure {

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
     * @type {Type<ITask>}
     * @memberof IContext
     */
    task: Type<ITask>;

    /**
     * config module target instance.
     *
     * @type {ITask}
     * @memberof IConfigure
     */
    moduleTarget?: ITask;

    /**
     * builder
     *
     * @type {IBuilder}
     * @memberof IContext
     */
    builder?: Token<IBuilder>;

    /**
     * load task modules.
     *
     * @type {AsyncLoadOptions}
     * @memberof ITaskContext
     */
    loader?: TaskType | TaskType[];

    /**
     * children
     *
     * @type {((IConfigure | Type<ITask>)[])}
     * @memberof IConfigure
     */
    children?: (IConfigure | Type<ITask>)[];
}


export type BootsrapTask = IConfigure | Token<any> | (Token<any>|IConfigure)[];
