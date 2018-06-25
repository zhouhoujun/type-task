import { Token, Inject, IContainer, Type, ContainerToken, OnInit, isToken } from '@ts-ioc/core';
import { IConfigure, TaskType } from './IConfigure';
import { ITask } from './ITask';
import { ITaskBuilder, TaskBuilderToken } from './ITaskBuilder';
import { ITaskRunner, TaskRunnerToken, RunState } from './ITaskRunner';
import * as uuid from 'uuid/v1';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Runner } from './decorators/index';
import { Joinpoint } from '@ts-ioc/aop';

/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Runner(TaskRunnerToken)
export class TaskRunner implements ITaskRunner, OnInit {

    get task(): TaskType<ITask> {
        return this.work;
    }

    get taskInstance(): ITask {
        return this.instance;
    }


    state: RunState;
    stateChanged: BehaviorSubject<RunState>;

    @Inject(ContainerToken)
    container: IContainer;

    /**
     * Creates an instance of TaskRunner.
     * @param {(Token<ITask> | Type<any> | IConfigure)} workflow
     * @param {ITask} [instance] workflow instance
     * @param {ITaskBuilder} [taskBuilder]
     * @memberof TaskRunner
     */
    constructor(
        private work: Token<ITask> | Type<any> | IConfigure,
        public uuid?: string,
        private instance?: ITask,
        private taskBuilder?: ITaskBuilder) {
        this.stateChanged = new BehaviorSubject(RunState.init);
    }

    onInit() {
        if (!this.uuid) {
            if (isToken(this.work)) {
                this.uuid = uuid();
            } else {
                this.uuid = this.work.uuid || uuid();
            }
        }
        this.container.bindProvider(this.uuid, this);
    }

    getBuilder(): ITaskBuilder {
        if (!this.taskBuilder) {
            this.taskBuilder = this.container.resolve(TaskBuilderToken);
        }
        return this.taskBuilder;
    }

    async getInstance() {
        if (!this.instance) {
            this.instance = await this.getBuilder().build(this.task);
        }
        if (!this.instance.workflowId) {
            this.instance.workflowId = this.uuid;
        }
        return this.instance;
    }


    async start(data?: any): Promise<any> {
        let instance = await this.getInstance();
        return instance.run(data)
            .then(data => {
                this.state = RunState.complete;
                this.stateChanged.next(this.state);
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

}
