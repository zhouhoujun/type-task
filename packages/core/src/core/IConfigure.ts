import { ITask } from './ITask';
import { Token, Type, AppConfiguration } from '@ts-ioc/core';
import { RunWay } from './RunWay';

/**
 * task type
 */
export type TaskType<T> = Token<T> | Type<any> | ITaskConfigure<T>;

/**
 * task config.
 *
 * @export
 * @interface ITaskConfigure
 */
export interface ITaskConfigure<T> extends AppConfiguration<T> {

    /**
    * context tasks name.
    *
    * @type {string}
    * @memberof IContext
    */
    name?: string;

    /**
     * root dir.
     *
     * @type {string}
     * @memberof IConfigure
     */
    rootdir?: string;

    /**
     * run way.
     *
     * @type {RunWay}
     * @memberof IContext
     */
    runWay?: RunWay;

    /**
     * task module.
     *
     * @type {Token<T>}
     * @memberof IConfigure
     */
    task?: Token<T>;

    /**
     * children
     *
     * @type {(ITaskConfigure<T> | Type<T>)[]}
     * @memberof IConfigure
     */
    children?: (ITaskConfigure<T> | Type<T>)[];
}

/**
 * task configure.
 *
 * @export
 * @interface IConfigure
 * @extends {ITaskConfigure<ITask>}
 */
export interface IConfigure extends ITaskConfigure<ITask> {

}
