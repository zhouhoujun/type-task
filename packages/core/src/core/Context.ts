import {
    isFunction, IContainer, Inject, ContainerToken, Singleton,
    Type, hasOwnClassMetadata, Token, isToken, ObjectMap,
    isPromise, isUndefined, isClass
} from '@ts-ioc/core';
import { IContext, ContextToken, CtxType, Expression } from './IContext';
import { ITaskContainer, TaskContainerToken } from '../ITaskContainer';
import { IConfigure, ActivityResultType } from './IConfigure';
import { IActivity } from './IActivity';
import { Task } from './decorators';
import { IActivityBuilder } from './IActivityBuilder';
import { ITaskRunner, TaskRunnerToken } from './ITaskRunner';
import { ActivityBuilder } from './ActivityBuilder';
import { Activity } from './Activity';
import { TaskRunner } from './TaskRunner';

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

    getRunner(task: ActivityResultType<any>, uuid?: string, builder?: IActivityBuilder | Token<IActivityBuilder>, instance?: any): ITaskRunner<any> {
        let builderInst: IActivityBuilder;
        if (isToken(builder)) {
            builderInst = this.container.resolve(builder);
        } else if (builder instanceof ActivityBuilder) {
            builderInst = builder;
        }
        return this.container.resolve(TaskRunnerToken, { activity: task, uuid: uuid, instance: instance, activityBuilder: builderInst })
    }


    getEnvArgs(): ObjectMap<any> {
        return {};
    }

    to<T>(target: CtxType<T>, config?: IConfigure): T {
        if (isFunction(target)) {
            if (isClass(target)) {
                return target as any;
            }
            return target(this, config);
        } else {
            return target;
        }
    }

    /**
     * exec activity result.
     *
     * @template T
     * @param {IActivity} target
     * @param {Expression<T>} result
     * @param {IConfigure} [data]
     * @returns {Promise<T>}
     * @memberof IContext
     */
    exec<T>(target: IActivity, expression: Expression<T>, data?: any): Promise<T> {
        if (isFunction(expression)) {
            return expression(target, data);
        } else if (isPromise(expression)) {
            return expression;
        } else if (expression instanceof Activity) {
            return expression.run(data, target);
        } else if (expression instanceof TaskRunner) {
            return expression.start(data);
        } else if (!isUndefined(expression)) {
            return Promise.resolve(expression as T);
        } else {
            return Promise.resolve(undefined); // Promise.reject('not right expression');
        }
    }

    isTask(task: Type<IActivity>): boolean {
        return hasOwnClassMetadata(Task, task);
    }
}
