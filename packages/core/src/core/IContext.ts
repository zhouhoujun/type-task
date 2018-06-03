import { IConfigure, TaskType } from './IConfigure';
import { ITask } from './ITask';
import { ITaskRunner } from './ITaskRunner';
import { ITaskBuilder } from './ITaskBuilder';
import { InjectToken, IContainer, ObjectMap, Type } from '@ts-ioc/core';
import { ITaskContainer } from '../ITaskContainer';

/**
 * context type.
 */
export type CtxType<T> = T | ((context?: IContext, config?: IConfigure) => T)

/**
 * task context token.
 */
export const ContextToken = new InjectToken<IContext>('__TASK_Context');

/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IContext {

    /**
     * get ioc container.
     *
     * @returns {IContainer}
     * @memberof IContext
     */
    getContainer(): IContainer;

    /**
     * get task container.
     *
     * @returns {ITaskContainer}
     * @memberof IContext
     */
    getTaskContiner(): ITaskContainer;

    /**
     * get task runner;
     *
     * @param {TaskType<ITask>} task
     * @param {*} [instance]
     * @param {ITaskBuilder} [builder]
     * @returns {ITaskRunner}
     * @memberof IContext
     */
    getRunner(task: TaskType<ITask>, instance?: any, builder?: ITaskBuilder): ITaskRunner;

    /**
     * get task run root path.
     *
     * @returns {string}
     * @memberof IContext
     */
    getRootPath(): string;

    /**
     *convert to finally type via context.
     *
     * @template T
     * @param {CtxType<T>} target
     * @param {IConfigure} [config]
     * @returns {T}
     * @memberof IContext
     */
    to<T>(target: CtxType<T>, config?: IConfigure): T;

    /**
     * check is task or not.
     *
     * @param {Type<ITask>} task
     * @returns {boolean}
     * @memberof IContext
     */
    isTask(task: Type<ITask>): boolean;
}
