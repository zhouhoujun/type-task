import {
    isFunction, IContainer, Inject, ContainerToken, Singleton,
    Type, hasOwnClassMetadata, Token, isToken, ObjectMap,
    isPromise, isClass, isString, Express
} from '@ts-ioc/core';
import { IContext, ContextToken, CtxType } from './IContext';
import { IConfigure, ActivityResultType, Expression, ExpressionType, ActivityType, isActivityType } from './IConfigure';
import { IActivity } from './IActivity';
import { Task } from './decorators';
import { IActivityBuilder, ActivityBuilderToken } from './IActivityBuilder';
import { IActivityRunner, ActivityRunnerToken } from './IActivityRunner';
import { ActivityBuilder } from './ActivityBuilder';
import { Activity } from './Activity';
import { ActivityRunner } from './ActivityRunner';
import { AppConfigurationToken } from '@ts-ioc/bootstrap';
import { ExpressionActivity } from './ExpressionActivity';
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
    builder: IActivityBuilder;

    constructor() {

    }

    getContainer(): IContainer {
        return this.container;
    }

    getRootPath(): string {
        let cfg = this.getContainer().get(AppConfigurationToken) || {};
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

    async toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>> {
        if (exptype instanceof ExpressionActivity) {
            return exptype;
        } else if (isActivityType(exptype)) {
            return await this.builder.build(exptype, this.container, target.id) as ExpressionActivity<T>;
        } else {
            return exptype;
        }
    }

    async toActivity<Ta extends IActivity, TCfg extends IConfigure>(exptype: ExpressionType<any> | ActivityType<Ta>, target: IActivity, isRightActivity: Express<any, boolean>, toConfig: Express<any, TCfg>, valify?: Express<TCfg, TCfg>): Promise<Ta> {
        let result: Ta;
        if (isActivityType(exptype, !valify)) {
            if (valify) {
                result = await this.builder.build(isToken(exptype) ? exptype : valify(exptype as TCfg), this.container, target.id) as Ta;
            } else {
                result = await this.builder.build(exptype, this.container, target.id) as Ta;
            }
        } else {
            result = exptype as Ta;
        }

        if (!(target instanceof ExpressionActivity) && isRightActivity(result)) {
            return result as Ta;
        }

        let rt;
        if (isString(result)) {
            rt = result;
        } else if (target instanceof ExpressionActivity) {
            rt = await target.context.exec(target, result);
        }
        let config = toConfig(rt);
        if (valify) {
            config = valify(config);
        }
        if (config) {
            result = await this.builder.build(config, this.container, target.id) as Ta;
        } else {
            result = null;
        }
        return result;
    }
}
