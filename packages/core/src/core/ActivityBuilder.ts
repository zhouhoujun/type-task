import { IActivityBuilder, ActivityBuilderToken } from './IActivityBuilder';
import {
    Type, isFunction, Inject, IContainer, Singleton, isString,
    ContainerToken, Token, Registration, isClass,
    getTypeMetadata, lang, Express, isToken, getClassName
} from '@ts-ioc/core';
import { IConfigure, isActivityType, ActivityType } from './IConfigure';
import { IActivity, ActivityToken } from './IActivity';
import { Task } from './decorators';
import { TaskMetadata } from './metadatas';
import { ExpressionType, Expression } from './IContext';
import { Activity } from './Activity';
import { ModuleBuilder } from '@ts-ioc/bootstrap';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(ActivityBuilderToken)
export class ActivityBuilder extends ModuleBuilder<IActivity> implements IActivityBuilder {

    constructor() {
        super()
    }

    build(task: ActivityType<IActivity>, uuid: string): Promise<IActivity> {
        return super.build(task, uuid);
    }

    async createInstance(token: Token<IActivity>, config: IConfigure, uuid: string): Promise<IActivity> {
        let instance = await super.createInstance(token, config);
        if (!instance || !(instance instanceof Activity)) {
            config.task = this.getDefaultAcitvity();
            console.log('try load default activity:', getClassName(config.task));
            instance = await this.build(config, uuid);
        }
        instance.id = uuid;
        if (isFunction(instance['onTaskInit'])) {
            instance['onTaskInit'](config);
        }
        return instance;
    }

    async buildStrategy(activity: IActivity, config: IConfigure): Promise<IActivity> {
        if (config.name) {
            activity.name = config.name;
        }
        activity.config = config;
        return activity;
    }

    getDecorator() {
        return Task.toString();
    }


    getDefaultAcitvity(): Type<IActivity> {
        return Activity;
    }


    protected async toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>> {
        if (isActivityType(exptype)) {
            return await this.build(exptype, target.id);
        } else {
            return exptype;
        }
    }

    protected async toActivity<Tr, Ta extends IActivity, TCfg extends IConfigure>(exptype: ExpressionType<Tr> | ActivityType<Ta>, target: IActivity, isRightActivity: Express<any, boolean>, toConfig: Express<Tr, TCfg>, valify?: Express<TCfg, TCfg>): Promise<Ta> {
        let result;
        if (isActivityType(exptype, !valify)) {
            if (valify) {
                result = await this.build(isToken(exptype) ? exptype : valify(exptype as TCfg), target.id);
            } else {
                result = await this.build(exptype, target.id);
            }
        } else {
            result = exptype;
        }

        if (isRightActivity(result)) {
            return result;
        }

        let rt;
        if (isString(result)) {
            rt = result;
        } else {
            rt = await target.context.exec(target, result);
        }
        let config = toConfig(rt);
        if (valify) {
            config = valify(config);
        }
        if (config) {
            result = await this.build(config, target.id);
        } else {
            result = null;
        }
        return result;
    }


    protected getBootstrapToken(cfg: IConfigure, token?: Token<IActivity> | Type<any>): Token<IActivity> {
        let bootstrapToken = cfg.task || cfg.bootstrap || token;
        if (isString(bootstrapToken)) {
            bootstrapToken = this.traslateStrToken(bootstrapToken);
        }
        return bootstrapToken;
    }

    protected traslateStrToken(token: string): Token<IActivity> {
        let taskToken = new Registration(ActivityToken, token);
        if (this.container.has(taskToken)) {
            return taskToken;
        }
        return token;
    }

}
