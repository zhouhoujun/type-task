import { isToken, Token, Providers, Inject, Singleton, IContainer, isClass, Type, hasOwnClassMetadata, isFunction, ContainerToken, Injectable } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { ITask } from './ITask';
import { ITaskBuilder, TaskBuilderToken } from './ITaskBuilder';
import { Task } from './decorators/index';
import { ITaskRunner, TaskRunnerToken } from './ITaskRunner';
import { ITaskComponent } from './ITaskComponent';

/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Injectable(TaskRunnerToken)
export class TaskRunner implements ITaskRunner {

    get task(): Token<ITask> | Type<any> | IConfigure {
        return this.work;
    }

    private instance: ITask;
    get taskInstance(): ITask {
        return this.instance;
    }


    state: any;
    currNode: ITask;

    @Inject(ContainerToken)
    private container: IContainer;

    constructor(private work: Token<ITask> | Type<any> | IConfigure, private taskBuilder?: ITaskBuilder) {

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
        }
        this.instance.run(data);
    }

    saveState(state: any) {

    }

    stop(): void {
        throw new Error("Method not implemented.");
    }
    pause(): void {
        throw new Error("Method not implemented.");
    }

}
