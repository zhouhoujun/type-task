import { ActivityConfigure } from './ActivityConfigure';
import { Token } from '@ts-ioc/core';
import { GActivity, IActivity } from './IActivity';
import { Observable } from 'rxjs/Observable';
import { Joinpoint } from '@ts-ioc/aop';
import { Activity } from './Activity';
import { IService, InjectServiceToken } from '@ts-ioc/bootstrap';



/**
 * activity runner token.
 */
export const ActivityRunnerToken = new InjectServiceToken<IActivity>(Activity);

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
export interface IActivityRunner<T> extends IService<GActivity<T>> {

    /**
     * actvity to run.
     *
     * @type {Token<IActivity>}
     * @memberof ITaskRunner
     */
    readonly activity: Token<IActivity>;

    readonly configure: ActivityConfigure;

    /**
     * activity instance
     *
     * @type {GActivity}
     * @memberof ITaskRunner
     */
    readonly instance: GActivity<T>;

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
    stop(): Promise<any>;

    /**
     * pause running activity.
     *
     * @memberof ITaskRunner
     */
    pause(): Promise<any>;

    /**
     * save state.
     *
     * @param {Joinpoint} state
     * @memberof ITaskRunner
     */
    saveState(state: Joinpoint);

}

