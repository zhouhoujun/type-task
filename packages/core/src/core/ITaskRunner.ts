import { TaskType } from './IConfigure';
import { InjectToken } from '@ts-ioc/core';
import { ITask } from './ITask';
import { ITaskBuilder } from './ITaskBuilder';
import { Observable } from 'rxjs/Observable';

/**
 * task runner token.
 */
export const TaskRunnerToken = new InjectToken<ITaskRunner>('__TASK_TaskRunner');

/**
 *run state.
 *
 * @export
 * @enum {number}
 */
export enum RunState {
    /**
     * task init.
     */
    init,
    /**
     * runing.
     */
    running,
    /**
     * task parused.
     */
    pause,
    /**
     * task stopped.
     */
    stop,
    /**
     * task complete.
     */
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
    readonly task: TaskType<ITask>;

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
     *state changed.
     *
     * @type {Observable<RunState>}
     * @memberof ITaskRunner
     */
    readonly stateChanged: Observable<RunState>;

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
