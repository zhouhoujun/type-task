import { Token, Inject, IContainer, Type, ContainerToken, OnInit, isToken } from '@ts-ioc/core';
import { IConfigure, ActivityType } from './IConfigure';
import { IActivity } from './IActivity';
import { IActivityBuilder, ActivityBuilderToken } from './IActivityBuilder';
import { ITaskRunner, TaskRunnerToken, RunState } from './ITaskRunner';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Runner } from './decorators';
import { Joinpoint } from '@ts-ioc/aop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { UUIDToken, RandomUUIDFactory } from './uuid';

/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Runner(TaskRunnerToken)
export class TaskRunner<T> implements ITaskRunner<T>, OnInit {

    get task(): ActivityType<T> {
        return this.work;
    }

    get taskInstance(): IActivity<T> {
        return this.instance;
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

    /**
     * Creates an instance of TaskRunner.
     * @param {ActivityType<T>} work
     * @param {string} [uuid]
     * @param {IActivity<T>} [instance]
     * @param {IActivityBuilder} [taskBuilder]
     * @memberof TaskRunner
     */
    constructor(
        private work: ActivityType<T>,
        public uuid?: string,
        private instance?: IActivity<T>,
        private taskBuilder?: IActivityBuilder) {
        this.stateChanged = new BehaviorSubject(RunState.init);
    }

    onInit() {
        this.container.bindProvider(this.getUUID(), this);
    }

    getUUID() {
        if (!this.uuid) {
            if (this.instance) {
                this.uuid = this.instance.id;
            } else if (isToken(this.work)) {
                this.uuid = this.createUUID();
            } else {
                this.uuid = this.uuid || this.createUUID()
            }
        }
        return this.uuid;
    }


    getBuilder(): IActivityBuilder {
        if (!this.taskBuilder) {
            this.taskBuilder = this.container.resolve(ActivityBuilderToken);
        }
        return this.taskBuilder;
    }

    async getInstance() {
        if (!this.instance) {
            this.instance = await this.getBuilder().build<T>(this.task, this.uuid);
        }
        return this.instance;
    }


    async start(data?: any): Promise<T> {
        let instance = await this.getInstance();
        return instance.run(data)
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

    stop(): void {
        this.state = RunState.stop;
        this.stateChanged.next(this.state);
    }
    pause(): void {
        this.state = RunState.pause;
        this.stateChanged.next(this.state);
    }

    protected createUUID() {
        if (!this.container.has(UUIDToken)) {
            this.container.register(RandomUUIDFactory);
        }
        return this.container.get(UUIDToken).generate();
    }

}
