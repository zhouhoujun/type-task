import { IConfigure } from './IConfigure';
import { Token, Providers, Type, InjectToken } from '@ts-ioc/core';
import { ITask } from './ITask';
import { ITaskBuilder } from './ITaskBuilder';

/**
 * task runner token.
 */
export const TaskRunnerToken = new InjectToken<ITaskRunner>('__TASK_TaskRunner');

export enum RunState {
    running,
    pause,
    stop,
    complete
}

/**
 * task runner.
 *
 * @export
 * @interface ITaskRunner
 */
export interface ITaskRunner {

    /**
     * runner task
     *
     * @type {(Token<ITask> | Type<any> | IConfigure)}
     * @memberof ITaskRunner
     */
    readonly task: Token<ITask> | Type<any> | IConfigure;

    /**
     * task instance
     *
     * @type {ITask}
     * @memberof ITaskRunner
     */
    readonly taskInstance: ITask;

    /**
     * current run task data.
     *
     * @type {*}
     * @memberof ITaskRunner
     */
    readonly state: RunState;

    /**
     * current run task node.
     *
     * @type {ITask}
     * @memberof ITaskRunner
     */
    readonly currNode: ITask;

    /**
     * get task builder.
     *
     * @returns {ITaskBuilder}
     * @memberof ITaskRunner
     */
    getBuilder(): ITaskBuilder;

    /**
     * start task.
     *
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof ITask
     */
    start(data?: any): Promise<any>;


    /**
     * stop running task.
     *
     * @memberof ITaskRunner
     */
    stop(): void;

    /**
     * pause running task.
     *
     * @memberof ITaskRunner
     */
    pause(): void;


    saveState(state: any);

}
