import { isToken, Token, Providers, Inject, symbols, Singleton, IContainer, isClass, Type, hasOwnClassMetadata, isFunction } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { ITask } from './ITask';
import { IBuilder } from './IBuilder';
import { taskSymbols } from '../utils/index';
import { Task, TaskModule } from './decorators/index';
import { ITaskRunner } from './ITaskRunner';

/**
 * task runner.
 * 
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
@Singleton(taskSymbols.ITaskRunner)
export class TaskRunner implements ITaskRunner {

    constructor(@Inject(symbols.IContainer) private container: IContainer) {

    }

    runTask(task: IConfigure | Token<any>, data?: any, ...providers: Providers[]): Promise<any> {
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

    runByConfig(cfg: IConfigure, data?: any): Promise<any> {
        return this.container.resolve<IBuilder>(cfg.builder || taskSymbols.IBuilder)
            .build(cfg)
            .then(task => {
                return task.run(data);
            });
    }

    isTask(task: Type<ITask>): boolean {
        return hasOwnClassMetadata(Task, task) || hasOwnClassMetadata(TaskModule, task);
    }
}
