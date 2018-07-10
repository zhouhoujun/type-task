import { TaskType } from './IConfigure';
import { InjectToken } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { ITaskBuilder } from './ITaskBuilder';
import { Observable } from 'rxjs/Observable';
import { Joinpoint } from '@ts-ioc/aop';

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
     * @type {(Token<IActivity> | Type<any> | IConfigure)}
     * @memberof ITaskRunner
     */
    readonly task: TaskType<IActivity>;

    /**
     * task instance
     *
     * @type {IActivity}
     * @memberof ITaskRunner
     */
    readonly taskInstance: IActivity;

    /**
     * current run task data.
     *
     * @type {*}
     * @memberof ITaskRunner
     */
    readonly state: RunState;

    /**
     * run result, observable data.
     *
     * @type {Observable<any>}
     * @memberof ITaskRunner
     */
    readonly result: Observable<any>;

    /**
     * run result value
     *
     * @type {*}
     * @memberof ITaskRunner
     */
    readonly resultValue: any

    /**
     *state changed.
     *
     * @type {Observable<RunState>}
     * @memberof ITaskRunner
     */
    readonly stateChanged: Observable<RunState>;

    /**
     * get workflow instance uuid.
     *
     * @returns {string}
     * @memberof ITaskRunner
     */
    getUUID(): string;

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

    /**
     * save state.
     *
     * @param {Joinpoint} state
     * @memberof ITaskRunner
     */
    saveState(state: Joinpoint);

}
