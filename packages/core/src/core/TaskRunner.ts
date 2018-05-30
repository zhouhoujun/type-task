import { isToken, Token, Providers, Inject, Singleton, IContainer, isClass, Type, hasOwnClassMetadata, isFunction, ContainerToken } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { ITask } from './ITask';
import { ITaskBuilder, BuilderToken } from './IBuilder';
import { Task, TaskModule } from './decorators/index';
import { ITaskRunner, TaskRunnerToken } from './ITaskRunner';
import { ITaskComponent } from './ITaskComponent';

/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Singleton(TaskRunnerToken)
export class TaskRunner implements ITaskRunner {

    constructor(@Inject(ContainerToken) private container: IContainer) {

    }

    runTask<T extends ITaskComponent>(task: IConfigure | Token<any>, data?: any, ...providers: Providers[]): Promise<any> {
        if (isToken(task)) {
            if (!this.container.has(task)) {
                if (isClass(task) && this.isTask(task)) {
                    this.container.register(task);
                } else {
                    return Promise.reject(`${typeof task} is not vaild task type.`);
                }
            }
            let instance = this.container.resolve<ITask>(task, ...providers);
            if (isFunction(instance.run)) {
                return instance.run(data);
            } else if (instance.config && isClass(instance.config.task) && this.isTask(instance.config.task)) {
                let cfg = instance.config as IConfigure;
                return this.runByConfig(cfg, data);
            } else {
                return Promise.reject(`${JSON.stringify(instance)} is not vaild task instance.`);
            }

        } else {
            return this.runByConfig(task, data);
        }
    }

    runByConfig<T extends ITaskComponent>(cfg: IConfigure, data?: any): Promise<any> {
        return this.container.resolve<ITaskBuilder>(cfg.builder || BuilderToken)
            .build(cfg)
            .then(task => {
                return task.run(data);
            });
    }

    isTask(task: Type<ITask>): boolean {
        return hasOwnClassMetadata(Task, task) || hasOwnClassMetadata(TaskModule, task);
    }
}
