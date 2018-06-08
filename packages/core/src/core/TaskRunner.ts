import { Token, Inject, IContainer, Type, ContainerToken, Injectable } from '@ts-ioc/core';
import { IConfigure, TaskType } from './IConfigure';
import { ITask } from './ITask';
import { ITaskBuilder, TaskBuilderToken } from './ITaskBuilder';
import { ITaskRunner, TaskRunnerToken, RunState } from './ITaskRunner';
import * as uuid from 'uuid/v1';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Injectable(TaskRunnerToken)
export class TaskRunner implements ITaskRunner {

    get task(): TaskType<ITask> {
        return this.work;
    }

    get taskInstance(): ITask {
        return this.instance;
    }


    state: RunState;
    stateChanged: BehaviorSubject<RunState>;
    currNode: ITask;
    uuid: string;

    @Inject(ContainerToken)
    private container: IContainer;

    /**
     * Creates an instance of TaskRunner.
     * @param {(Token<ITask> | Type<any> | IConfigure)} workflow
     * @param {ITask} [instance] workflow instance
     * @param {ITaskBuilder} [taskBuilder]
     * @memberof TaskRunner
     */
    constructor(private work: Token<ITask> | Type<any> | IConfigure, private instance?: ITask, private taskBuilder?: ITaskBuilder) {
        this.uuid = uuid();
        this.stateChanged = new BehaviorSubject(RunState.init);
        if (this.instance) {
            this.instance.workflowId = this.uuid;
        }
    }

    getBuilder(): ITaskBuilder {
        if (!this.taskBuilder) {
            this.taskBuilder = this.container.resolve(TaskBuilderToken);
        }
        return this.taskBuilder;
    }


    async start(data?: any): Promise<any> {
        if (!this.instance) {
            this.instance = await this.getBuilder().build(this.task);
            this.instance.workflowId = this.uuid;
            this.container.bindProvider(this.uuid, this);
        }
        this.state = RunState.running;
        this.instance.run(data)
            .then(data => {
                this.state = RunState.complete;
                this.stateChanged.next(this.state);
                return data;
            });
    }

    saveState(state: any) {

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
