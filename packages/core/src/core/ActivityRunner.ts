import { Inject, IContainer, ContainerToken, Token, Injectable } from '@ts-ioc/core';
import { ActivityConfigure } from './ActivityConfigure';
import { IActivity } from './IActivity';
import { IActivityRunner, ActivityRunnerToken, RunState } from './IActivityRunner';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Joinpoint } from '@ts-ioc/aop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { DefaultAnnotationBuilderToken } from '@ts-ioc/bootstrap';

/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Injectable(ActivityRunnerToken)
export class ActivityRunner<T> implements IActivityRunner<T> {

    get activity(): Token<IActivity> {
        return this.token;
    }
    get configure(): ActivityConfigure {
        return this.config;
    }

    private _result = new BehaviorSubject<any>(null);
    get result(): Observable<any> {
        return this._result.filter(a => !a);
    }

    private _resultValue: any;
    get resultValue(): any {
        return this._resultValue;
    }


    state: RunState;
    stateChanged: BehaviorSubject<RunState>;

    @Inject(ContainerToken)
    container: IContainer;

    constructor(
        public token: Token<IActivity>,
        public config: ActivityConfigure,
        public instance: IActivity) {
        this.stateChanged = new BehaviorSubject(RunState.init);
    }



    async start(data?: any): Promise<T> {
        return await this.instance.run(data)
            .then(data => {
                this.state = RunState.complete;
                this.stateChanged.next(this.state);
                this._resultValue = data;
                this._result.next(data);
                return data;
            });
    }

    _currState: Joinpoint;
    saveState(state: Joinpoint) {
        this._currState = state;
    }

    async stop(): Promise<any> {
        this.state = RunState.stop;
        this.stateChanged.next(this.state);
    }

    async pause(): Promise<any> {
        this.state = RunState.pause;
        this.stateChanged.next(this.state);
    }

}
