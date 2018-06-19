import { Token, Inject, IContainer, Type, ContainerToken } from '@ts-ioc/core';
import { IConfigure, TaskType } from './IConfigure';
import { ITask } from './ITask';
import { ITaskBuilder, TaskBuilderToken } from './ITaskBuilder';
import { ITaskRunner, TaskRunnerToken, RunState } from './ITaskRunner';
import * as uuid from 'uuid/v1';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Runner } from './decorators/index';

/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Runner(TaskRunnerToken)
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


    /**
     * Creates an instance of TaskRunner.
     * @param {(Token<ITask> | Type<any> | IConfigure)} workflow
     * @param {ITask} [instance] workflow instance
     * @param {ITaskBuilder} [taskBuilder]
     * @memberof TaskRunner
     */
    constructor(
        private work: Token<ITask> | Type<any> | IConfigure,
        @Inject(ContainerToken) private container: IContainer,
        private instance?: ITask,
        private taskBuilder?: ITaskBuilder) {
        this.uuid = uuid();
        this.stateChanged = new BehaviorSubject(RunState.init);

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
