import { AsyncLoadOptions, Type, Token, Providers, ObjectMap } from 'tsioc';
import { RunWay } from './RunWay';
import { IBuilder } from './IBuilder';
import { TaskType } from '../utils/index';
import { ITask } from './ITask';


/**
 * Task provider
 *
 * @export
 * @interface TaskProvider
 * @extends {ObjectMap<any>}
 */
export interface ITaskProvider extends ObjectMap<any> {
    /**
    * context tasks name.
    *
    * @type {string}
    * @memberof IContext
    */
    name?: string;

    /**
     * run way.
     *
     * @type {RunWay}
     * @memberof IContext
     */
    runWay?: RunWay;
}

export type TaskProvider = ITaskProvider | Providers;

/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IContext {

    /**
     * task providers
     *
     * @type {(TaskProvider | TaskProvider[])}
     * @memberof IContext
     */
    providers?: TaskProvider | TaskProvider[];

    /**
     * boostrap tasks.
     *
     * @type {Type<ITask>}
     * @memberof IContext
     */
    task: Type<ITask>;

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
     * @type {IContext[]}
     * @memberof IContext
     */
    children?: IContext[];
}
