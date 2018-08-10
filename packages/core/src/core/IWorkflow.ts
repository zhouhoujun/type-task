import { ActivityResultType, Active } from './ActivityConfigure';
import { Registration, Token } from '@ts-ioc/core';
import { GActivity, IActivity } from './IActivity';
import { IActivityBuilder } from './IActivityBuilder';
import { Observable } from 'rxjs/Observable';
import { Joinpoint } from '@ts-ioc/aop';
import { ModuleConfig } from '@ts-ioc/bootstrap';
import { IWorkflowBuilder } from '../IWorkflowBuilder';


/**
 * Inject AcitityRuner Token
 *
 * @export
 * @class InjectWorkflowToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectWorkflowToken<T extends IWorkflow<any>> extends Registration<T> {
    constructor(desc: string) {
        super('ActivityRunner', desc);
    }
}

/**
 * activity runner token.
 */
export const WorkflowToken = new InjectWorkflowToken<IWorkflow<any>>('');

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
 * workflow configuration.
 *
 * @export
 * @interface WorkflowConfig
 * @extends {ModuleConfig<IWorkflow<any>>}
 * @extends {ActivityConfigure}
 */
export interface WorkflowConfig extends ModuleConfig<IWorkflow<any>> {
    activity?: Active;
    bootstrap?: Token<any>;
    builder?: Token<IWorkflowBuilder> | IWorkflowBuilder;
}

/**
 * task runner.
 *
 * @export
 * @interface ITaskRunner
 */
export interface IWorkflow<T> {

    /**
     * actvity to run.
     *
     * @type {ActivityResultType<T>}
     * @memberof ITaskRunner
     */
    readonly activity: ActivityResultType<T>;

    /**
     * activity instance
     *
     * @type {GActivity}
     * @memberof ITaskRunner
     */
    readonly activityInstance: GActivity<T>;

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

export type WorkflowType = WorkflowConfig | Token<IWorkflow<any>>
