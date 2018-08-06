import { IActivityModuleBuilder, ActivityBuilderToken, ActivityBootBuilderToken, IActivityBootBuilder } from './IActivityBuilder';
import {
    Type, isFunction, isString, Token, Registration, Express, isToken,
    getClassName, Injectable, IContainer, Singleton
} from '@ts-ioc/core';
import { IConfigure, isActivityType, ActivityType, ExpressionType, Expression } from './IConfigure';
import { IActivity, ActivityToken } from './IActivity';
import { Activity } from './Activity';
import { ModuleBuilder, BootBuilder, IBootBuilder } from '@ts-ioc/bootstrap';
import { AssignActivity } from './ExpressionActivity';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';


@Singleton(ActivityBootBuilderToken)
export class ActivityBootBuilder extends BootBuilder<IActivity> implements IActivityBootBuilder {

    async createInstance(token: Token<IActivity>, config: IConfigure, uuid: string): Promise<IActivity> {
        console.log(token);
        let instance = await super.createInstance(token, config, uuid);
        console.log(instance);
        if (!instance || !(instance instanceof Activity)) {
            let task = this.getDefaultAcitvity();
            console.log('try load default activity:', getClassName(task));
            instance = await this.build(task, config, uuid);
        }
        instance.id = uuid;
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

    async buildMdlCfg(activity: ActivityType<any>, data: any) {
        if (isToken(activity)) {
            return await this.build(activity, undefined, data);
        } else {
            return await this.buildByConfig(activity, data);
        }
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
            return await this.buildMdlCfg(exptype, target.id) as AssignActivity<T>;
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
                result = await this.buildMdlCfg(isToken(exptype) ? exptype : valify(exptype as TCfg), target.id);
            } else {
                result = await this.buildMdlCfg(exptype, target.id);
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
            result = await this.buildMdlCfg(config, target.id);
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
@Injectable(ActivityBuilderToken)
export class ActivityModuleBuilder extends ModuleBuilder<IActivity> implements IActivityModuleBuilder {

    // async build(activity: ActivityType<IActivity>, container?: IContainer, uuid?: string): Promise<IActivity> {
    //     let instance = await super.build(activity, container, uuid);
    //     return instance;
    // }

    protected getBootstrapToken(cfg: IConfigure): Token<IActivity> {
        return cfg.task || cfg.bootstrap;
    }

    protected getDefaultBootBuilder(container: IContainer): IBootBuilder<any> {
        return container.resolve(ActivityBootBuilderToken);
    }

    protected async registerExts(container: IContainer, config: IConfigure): Promise<IContainer> {
        if (!container.has(AopModule)) {
            container.register(AopModule);
        }

        if (!container.has(LogModule)) {
            container.register(LogModule);
        }

        // if (!container.has(LogModule)) {
        //     container.register(LogModule);
        // }

        return container;
    }

}
