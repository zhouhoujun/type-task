import { isFunction, IContainer, Inject, ContainerToken, Singleton, Type, hasOwnClassMetadata, Token, isToken, ObjectMap } from '@ts-ioc/core';
import { IContext, ContextToken, CtxType } from './IContext';
import { ITaskContainer, TaskContainerToken } from '../ITaskContainer';
import { IConfigure, TaskType } from './IConfigure';
import { IActivity } from './IActivity';
import { Task } from './decorators';
import { ITaskBuilder } from './ITaskBuilder';
import { ITaskRunner, TaskRunnerToken } from './ITaskRunner';
import { TaskBuilder } from './TaskBuilder';

/**
 * task context.
 *
 * @export
 * @class Context
 * @implements {IContext}
 */
@Singleton(ContextToken)
export class Context implements IContext {

    @Inject(ContainerToken)
    private container: IContainer;

    constructor() {

    }


    getContainer(): IContainer {
        return this.container;
    }

    getTaskContiner(): ITaskContainer {
        return this.container.resolve(TaskContainerToken);
    }

    getRootPath() {
        return this.getTaskContiner().getRootPath();
    }

    getRunner(task: TaskType<IActivity>, uuid?: string, builder?: ITaskBuilder | Token<ITaskBuilder>, instance?: any): ITaskRunner {
        let builderInst: ITaskBuilder;
        if (isToken(builder)) {
            builderInst = this.container.resolve(builder);
        } else if (builder instanceof TaskBuilder) {
            builderInst = builder;
        }
        return this.container.resolve(TaskRunnerToken, { work: task, uuid: uuid, instance: instance, taskBuilder: builderInst })
    }

    getEnvArgs(): ObjectMap<any> {
        return {};
    }

    to<T>(target: CtxType<T>, config?: IConfigure): T {
        return isFunction(target) ? target(this, config) : target;
    }

    isTask(task: Type<IActivity>): boolean {
        return hasOwnClassMetadata(Task, task);
    }
}
