import { ActivityType } from './IConfigure';
import { InjectToken, Registration } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IActivityBuilder } from './IActivityBuilder';
import { Observable } from 'rxjs/Observable';
import { Joinpoint } from '@ts-ioc/aop';


/**
 * Inject AcitityToken
 *
 * @export
 * @class InjectAcitityToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectTaskRunnerToken<T extends ITaskRunner<any>> extends Registration<T> {
    constructor(desc: string) {
        super('TaskRunner', desc);
    }
}

/**
 * task runner token.
 */
export const TaskRunnerToken = new InjectTaskRunnerToken<ITaskRunner<any>>('');

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
export interface ITaskRunner<T> {

    /**
     * runner task
     *
     * @type {ActivityType<T>}
     * @memberof ITaskRunner
     */
    readonly task: ActivityType<T>;

    /**
     * task instance
     *
     * @type {IActivity<any>}
     * @memberof ITaskRunner
     */
    readonly taskInstance: IActivity<T>;

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
     * @returns {IActivityBuilder}
     * @memberof ITaskRunner
     */
    getBuilder(): IActivityBuilder;

    /**
     * start task.
     *
     * @param {*} [data]
     * @returns {Promise<T>}
     * @memberof ITask
     */
    start(data?: any): Promise<T>;

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
