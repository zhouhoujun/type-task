import { isFunction, IContainer, Inject, ContainerToken, Singleton, Type, hasOwnClassMetadata, Token, isToken, ObjectMap, isPromise, isUndefined } from '@ts-ioc/core';
import { IContext, ContextToken, CtxType, Condition, ActivityResult, Expression } from './IContext';
import { ITaskContainer, TaskContainerToken } from '../ITaskContainer';
import { IConfigure, ActivityType } from './IConfigure';
import { IActivity } from './IActivity';
import { Task } from './decorators';
import { IActivityBuilder } from './IActivityBuilder';
import { ITaskRunner, TaskRunnerToken } from './ITaskRunner';
import { ActivityBuilder } from './ActivityBuilder';
import { Activity } from './Activity';

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

    getRunner(task: ActivityType<IActivity<any>>, uuid?: string, builder?: IActivityBuilder | Token<IActivityBuilder>, instance?: any): ITaskRunner {
        let builderInst: IActivityBuilder;
        if (isToken(builder)) {
            builderInst = this.container.resolve(builder);
        } else if (builder instanceof ActivityBuilder) {
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

    /**
     * exec activity result.
     *
     * @template T
     * @param {IActivity<any>} target
     * @param {Expression<T>} result
     * @param {IConfigure} [data]
     * @returns {Promise<T>}
     * @memberof IContext
     */
    exec<T>(target: IActivity<any>, expression: Expression<T>, data?: any): Promise<T> {
        if (isFunction(expression)) {
            return expression(target, data);
        } else if (isPromise(expression)) {
            return expression;
        } else if (expression instanceof Activity) {
            return expression.run(data, target);
        } else if (!isUndefined(expression)) {
            return Promise.resolve(expression as T);
        } else {
            return Promise.reject('not right expression');
        }
    }

    //     /**
    //  * validate condition.
    //  *
    //  * @param {Condition} condition
    //  * @param {*} data
    //  * @returns {Promise<boolean>}
    //  * @memberof Context
    //  */
    // validate(condition: Condition, data: any): Promise<boolean> {
    //     return Promise.resolve(true);
    // }

    isTask(task: Type<IActivity<any>>): boolean {
        return hasOwnClassMetadata(Task, task);
    }
}
