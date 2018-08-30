import {
    isFunction, IContainer, Inject, ContainerToken, Singleton,
    Type, hasOwnClassMetadata, ObjectMap, isPromise, isClass
} from '@ts-ioc/core';
import { IContext, ContextToken, CtxType } from './IContext';
import { ActivityConfigure, Expression } from './ActivityConfigure';
import { IActivity } from './IActivity';
import { Task } from '../decorators';
import { ActivityBuilder, ActivityBuilderToken } from '../injectors';
import { Activity } from './Activity';
import { ActivityRunner } from './ActivityRunner';
import { AppConfigureToken } from '@ts-ioc/bootstrap';


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

    @Inject(ActivityBuilderToken)
    builder: ActivityBuilder;

    constructor() {

    }

    getContainer(): IContainer {
        return this.container;
    }

    getRootPath(): string {
        let cfg = this.getContainer().get(AppConfigureToken) || {};
        return cfg.baseURL || '.';
    }


    getEnvArgs(): ObjectMap<any> {
        return {};
    }

    to<T>(target: CtxType<T>, config?: ActivityConfigure): T {
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
     * @param {ActivityConfigure} [data]
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
