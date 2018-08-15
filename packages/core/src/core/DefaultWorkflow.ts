import { Inject, IContainer, ContainerToken, OnInit, isToken } from '@ts-ioc/core';
import { ActivityResultType } from './ActivityConfigure';
import { IActivity, GActivity } from './IActivity';
import { IActivityBuilder, ActivityBuilderToken } from './IActivityBuilder';
import { IWorkflow, WorkflowToken, RunState } from './IWorkflow';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Workflow } from './decorators';
import { Joinpoint } from '@ts-ioc/aop';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { UUIDToken, RandomUUIDFactory } from './uuid';
import { Service } from '@ts-ioc/bootstrap';

/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Workflow(WorkflowToken)
export class DefaultWorkflow<T> extends Service implements IWorkflow<T>, OnInit {

    get activity(): ActivityResultType<T> {
        return this.activities;
    }

    get activityInstance(): GActivity<T> {
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
     * @param {ActivityResultType<T>} activities
     * @param {string} [uuid]
     * @param {IActivity<T>} [instance]
     * @param {IActivityBuilder} [activityBuilder]
     * @memberof TaskRunner
     */
    constructor(
        private activities: ActivityResultType<T>,
        public uuid?: string,
        private instance?: IActivity,
        private activityBuilder?: IActivityBuilder) {
        super();
        this.stateChanged = new BehaviorSubject(RunState.init);
    }

    onInit() {
        this.container.bindProvider(this.getUUID(), this);
    }

    getUUID() {
        if (!this.uuid) {
            if (this.instance && this.instance.id) {
                this.uuid = this.instance.id;
            } else if (isToken(this.activity)) {
                this.uuid = this.createUUID();
            }
            this.uuid = this.uuid || this.createUUID()
        }
        return this.uuid;
    }


    getBuilder(): IActivityBuilder {
        if (!this.activityBuilder) {
            this.activityBuilder = this.container.resolve(ActivityBuilderToken);
        }
        return this.activityBuilder;
    }

    async getInstance() {
        if (!this.instance) {
            this.instance = await this.getBuilder().buildByConfig(this.activity, this.getUUID());
        }
        return this.instance;
    }

    getBaseURL(): string {
        if (this.instance) {
            return this.instance.config.baseURL;
        }
        return '.';
    }


    async start(data?: any): Promise<T> {
        let instance = await this.getInstance();
        return await instance.run(data)
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

    protected createUUID() {
        if (!this.container.has(UUIDToken)) {
            this.container.register(RandomUUIDFactory);
        }
        return this.container.get(UUIDToken).generate();
    }

}
