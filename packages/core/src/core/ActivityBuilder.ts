import { IActivityModuleBuilder, ActivityBuilderToken, ActivityBootBuilderToken, IActivityBootBuilder } from './IActivityBuilder';
import {
    Type, isFunction, isString, Token, Registration, Express, isToken,
    getClassName, Injectable, IContainer, Singleton, Inject, ContainerToken
} from '@ts-ioc/core';
import { IConfigure, isActivityType, ActivityType, ExpressionType, Expression } from './IConfigure';
import { IActivity, ActivityToken } from './IActivity';
import { Activity } from './Activity';
import { ModuleBuilder, BootBuilder, IBootBuilder } from '@ts-ioc/bootstrap';
import { AssignActivity } from './ExpressionActivity';
import { Task } from './decorators';


@Singleton(ActivityBootBuilderToken)
export class ActivityBootBuilder extends BootBuilder<IActivity> implements IActivityBootBuilder {

    @Inject(ActivityBuilderToken)
    builder: IActivityModuleBuilder;

    build(token: Token<IActivity>, config: IConfigure, data?: any): Promise<IActivity> {
        return super.build(token, config, data);
    }


    buildByConfig(activity: ActivityType<any>, data: any) {
        return super.buildByConfig(activity, data);
    }

    getBuilder(token: Token<IActivity>, config?: IConfigure): IBootBuilder<IActivity> {
        return super.getBuilder(token, config);
    }

    async createInstance(token: Token<IActivity>, config: IConfigure, uuid: string): Promise<IActivity> {
        let instance = await super.createInstance(token, config, uuid);
        if (!instance || !(instance instanceof Activity)) {
            let task = this.getDefaultAcitvity();
            console.log('try load default activity:', getClassName(task));
            instance = await this.build(task, config, uuid);
        }
        if (isString(uuid)) {
            instance.id = uuid;
        }
        if (isFunction(instance['onTaskInit'])) {
            await Promise.resolve(instance['onTaskInit'](config));
        }
        return instance;
    }

    async buildStrategy(activity: IActivity, config: IConfigure, container?: IContainer): Promise<IActivity> {
        if (config.name) {
            activity.name = config.name;
        }
        activity.config = config;
        return activity;
    }

    getDefaultAcitvity(): Type<IActivity> {
        return Activity;
    }

    getBootstrapToken(config: IConfigure): Token<IActivity> {
        let token = config.task || config.bootstrap;
        if (isString(token)) {
            token = this.traslateStrToken(token);
        }
        return token;
    }

    protected resolveToken(token: Token<IActivity>, uuid?: string): IActivity {
        let activity = this.container.resolve(token);
        activity.id = uuid;
        return activity;
    }

    protected traslateStrToken(token: string): Token<IActivity> {
        let taskToken = new Registration(ActivityToken, token);
        if (this.container.has(taskToken)) {
            return taskToken;
        }
        return token;
    }

    /**
     * to expression
     *
     * @template T
     * @param {ExpressionType<T>} exptype
     * @param {IActivity} target
     * @returns {Promise<Expression<T>>}
     * @memberof ActivityBootBuilder
     */
    async toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>> {
        if (isActivityType(exptype)) {
            return await this.builder.bootstrap(exptype, this.container, target.id) as AssignActivity<T>;
        } else {
            return exptype;
        }
    }

    /**
    * to activity.
    *
    * @template Tr
    * @template Ta
    * @template TCfg
    * @param {(ExpressionType<Tr> | ActivityType<Ta>)} exptype
    * @param {IActivity} target
    * @param {Express<any, boolean>} isRightActivity
    * @param {Express<Tr, TCfg>} toConfig
    * @param {Express<TCfg, TCfg>} [valify]
    * @returns {Promise<Ta>}
    * @memberof ActivityBootBuilder
    */
    async toActivity<Tr, Ta extends IActivity, TCfg extends IConfigure>(exptype: ExpressionType<Tr> | ActivityType<Ta>, target: IActivity, isRightActivity: Express<Ta, boolean>, toConfig: Express<Tr, TCfg>, valify?: Express<TCfg, TCfg>): Promise<Ta> {
        let result;
        if (isActivityType(exptype, !valify)) {
            if (valify) {
                result = await this.builder.bootstrap(isToken(exptype) ? exptype : valify(exptype as TCfg), this.container, target.id);
            } else {
                result = await this.builder.bootstrap(exptype, this.container, target.id);
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
            result = await this.buildByConfig(config, target.id);
        } else {
            result = null;
        }
        return result;
    }

}

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(ActivityBuilderToken)
export class ActivityModuleBuilder extends ModuleBuilder<IActivity> implements IActivityModuleBuilder {

    async bootstrap(activity: ActivityType<IActivity>, container?: IContainer, uuid?: string): Promise<any> {
        let instance = await super.bootstrap(activity, container, uuid);
        return instance;
    }

    protected async registerExts(container: IContainer, config: IConfigure): Promise<IContainer> {
        await super.registerExts(container, config);
        // container.register(ActivityBootBuilder);
        return container;
    }

    protected getBootstrapToken(cfg: IConfigure): Token<IActivity> {
        return cfg.task || cfg.bootstrap;
    }

    protected getDefaultBootBuilder(container: IContainer): IBootBuilder<any> {
        return container.resolve(ActivityBootBuilderToken);
    }

    getDecorator() {
        return Task.toString();
    }

}
