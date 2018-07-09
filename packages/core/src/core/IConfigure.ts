import { ITask } from './ITask';
import { Token, Type, AppConfiguration } from '@ts-ioc/core';
import { RunWay } from './RunWay';
import { ITaskBuilder } from './ITaskBuilder';

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
     * task uuid.
     *
     * @type {string}
     * @memberof ITaskConfigure
     */
    uuid?: string;

    /**
    * context tasks name.
    *
    * @type {string}
    * @memberof ITaskConfigure
    */
    name?: string;

    /**
     * root dir.
     *
     * @type {string}
     * @memberof ITaskConfigure
     */
    rootdir?: string;

    /**
     * run way.
     *
     * @type {RunWay}
     * @memberof ITaskConfigure
     */
    runWay?: RunWay;

    /**
     * task module.
     *
     * @type {Token<T>}
     * @memberof ITaskConfigure
     */
    task?: Token<T>;

    /**
     * the task builder.
     *
     * @type {(Token<ITaskBuilder> | ITaskBuilder)}
     * @memberof ITaskConfigure
     */
    builder?: Token<ITaskBuilder> | ITaskBuilder;

    /**
     * children
     *
     * @type {(ITaskConfigure<T> | Token<T>)[]}
     * @memberof IConfigure
     */
    children?: (ITaskConfigure<T> | Token<T>)[];
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
