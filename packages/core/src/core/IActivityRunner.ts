import { ActivityResultType } from './IConfigure';
import { Registration } from '@ts-ioc/core';
import { GActivity } from './IActivity';
import { IActivityBuilder } from './IActivityBuilder';
import { Observable } from 'rxjs/Observable';
import { Joinpoint } from '@ts-ioc/aop';
import { IApplication } from '@ts-ioc/bootstrap';


/**
 * Inject AcitityRuner Token
 *
 * @export
 * @class InjectActivityRunnerToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectActivityRunnerToken<T extends IActivityRunner<any>> extends Registration<T> {
    constructor(desc: string) {
        super('ActivityRunner', desc);
    }
}

/**
 * activity runner token.
 */
export const ActivityRunnerToken = new InjectActivityRunnerToken<IActivityRunner<any>>('');

/**
 *run state.
 *
 * @export
 * @enum {number}
 */
export enum RunState {
    /**
     * activity init.
     */
    init,
    /**
     * runing.
     */
    running,
    /**
     * activity parused.
     */
    pause,
    /**
     * activity stopped.
     */
    stop,
    /**
     * activity complete.
     */
    complete
}

/**
 * task runner.
 *
 * @export
 * @interface ITaskRunner
 */
export interface IActivityRunner<T> extends IApplication {

    /**
     * runner task
     *
     * @type {ActivityResultType<T>}
     * @memberof ITaskRunner
     */
    readonly task: ActivityResultType<T>;

    /**
     * task instance
     *
     * @type {GActivity}
     * @memberof ITaskRunner
     */
    readonly taskInstance: GActivity<T>;

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
     * get task run base path.
     *
     * @returns {string}
     * @memberof IContext
     */
    getBaseURL(): string;

    /**
     * get activity builder.
     *
     * @returns {IActivityBuilder}
     * @memberof ITaskRunner
     */
    getBuilder(): IActivityBuilder;

    /**
     * start activity.
     *
     * @param {*} [data]
     * @returns {Promise<T>}
     * @memberof ITask
     */
    start(data?: any): Promise<T>;

    /**
     * stop running activity.
     *
     * @memberof ITaskRunner
     */
    stop(): void;

    /**
     * pause running activity.
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
