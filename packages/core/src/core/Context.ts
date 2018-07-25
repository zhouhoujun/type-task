import {
    isFunction, IContainer, Inject, ContainerToken, Singleton,
    Type, hasOwnClassMetadata, Token, isToken, ObjectMap,
    isPromise, isClass
} from '@ts-ioc/core';
import { IContext, ContextToken, CtxType } from './IContext';
import { IConfigure, ActivityResultType, Expression } from './IConfigure';
import { IActivity } from './IActivity';
import { Task } from './decorators';
import { IActivityBuilder } from './IActivityBuilder';
import { IActivityRunner, ActivityRunnerToken } from './ITaskRunner';
import { ActivityBuilder } from './ActivityBuilder';
import { Activity } from './Activity';
import { ActivityRunner } from './TaskRunner';
import { RootContainerToken, AppConfigurationToken } from '@ts-ioc/bootstrap';

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

    @Inject(RootContainerToken)
    private rootContainer: IContainer;

    constructor() {

    }


    getRootContainer(): IContainer {
        return this.rootContainer;
    }


    getContainer(): IContainer {
        return this.container;
    }

    getRootPath(): string {
        let cfg = this.getRootContainer().get(AppConfigurationToken) || {};
        return cfg.baseURL || '.';
    }


    createRunner(task: ActivityResultType<any>, uuid?: string, builder?: IActivityBuilder | Token<IActivityBuilder>, instance?: any): IActivityRunner<any> {
        let builderInst: IActivityBuilder;
        if (isToken(builder)) {
            builderInst = this.container.resolve(builder);
        } else if (builder instanceof ActivityBuilder) {
            builderInst = builder;
        }
        return this.container.resolve(ActivityRunnerToken, { activity: task, uuid: uuid, instance: instance, activityBuilder: builderInst })
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
        } else if (expression instanceof ActivityRunner) {
            return expression.start(data);
        } else {
            return Promise.resolve(expression as T);
        }
    }

    isTask(task: Type<IActivity>): boolean {
        return hasOwnClassMetadata(Task, task);
    }
}
