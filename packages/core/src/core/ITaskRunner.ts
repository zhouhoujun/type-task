import { IConfigure } from './IConfigure';
import { Token, Providers, Type, InjectToken } from '@ts-ioc/core';
import { ITask } from './ITask';

/**
 * task runner token.
 */
export const TaskRunnerToken = new InjectToken<ITaskRunner>('__TASK_TaskRunner');

/**
 * task runner.
 *
 * @export
 * @interface ITaskRunner
 */
export interface ITaskRunner {
    /**
     * run task.
     *
     * @param {(IConfigure<ITask> | Token<any>)} task
     * @param {*} [data]
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof ITaskRunner
     */
    runTask(task: IConfigure<ITask> | Token<any>, data?: any, ...providers: Providers[]): Promise<any>;

    /**
     * run configure task
     *
     * @param {IConfigure} cfg
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof ITaskRunner
     */
    runByConfig(cfg: IConfigure<ITask>, data?: any): Promise<any>;

    /**
     * is type task or not.
     *
     * @param {Type<ITask>} task
     * @returns {boolean}
     * @memberof ITaskRunner
     */
    isTask(task: Type<ITask>): boolean;
}
