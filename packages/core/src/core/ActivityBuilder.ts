import { IActivityBuilder, ActivityBuilderToken, ActivityBootBuilderToken } from './IActivityBuilder';
import {
    Type, isFunction, isString,
    Token, Registration, Express, isToken, getClassName, Injectable, IContainer, Inject
} from '@ts-ioc/core';
import { IConfigure, isActivityType, ActivityType, ExpressionType, Expression } from './IConfigure';
import { IActivity, ActivityToken } from './IActivity';
import { Activity } from './Activity';
import { ModuleBuilder, BootBuilder, IBootBuilder } from '@ts-ioc/bootstrap';
import { AssignActivity } from './ExpressionActivity';


@Injectable(ActivityBootBuilderToken)
export class ActivityBootBuilder extends BootBuilder<IActivity> {

    async createInstance(token: Token<IActivity>, config: IConfigure, uuid: string): Promise<IActivity> {
        let instance = await super.createInstance(token, config, uuid);
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

    protected async buildMdl2Cfg(activity: ActivityType<any>, data: any) {
        if (isToken(activity)) {
            return await this.build(activity, undefined, data);
        } else {
            return await this.buildByConfig(activity, data);
        }
    }

    protected async toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>> {
        if (isActivityType(exptype)) {
            return await this.buildMdl2Cfg(exptype, target.id) as AssignActivity<T>;
        } else {
            return exptype;
        }
    }

    protected async toActivity<Tr, Ta extends IActivity, TCfg extends IConfigure>(exptype: ExpressionType<Tr> | ActivityType<Ta>, target: IActivity, isRightActivity: Express<any, boolean>, toConfig: Express<Tr, TCfg>, valify?: Express<TCfg, TCfg>): Promise<Ta> {
        let result;
        if (isActivityType(exptype, !valify)) {
            if (valify) {
                result = await this.buildMdl2Cfg(isToken(exptype) ? exptype : valify(exptype as TCfg), target.id);
            } else {
                result = await this.buildMdl2Cfg(exptype, target.id);
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
            result = await this.buildMdl2Cfg(config, target.id);
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
export class ActivityBuilder extends ModuleBuilder<IActivity> implements IActivityBuilder {

    // async build(activity: ActivityType<IActivity>, container?: IContainer, uuid?: string): Promise<IActivity> {
    //     let instance = await super.build(activity, container, uuid);
    //     return instance;
    // }

    protected getDefaultBootBuilder(container: IContainer): IBootBuilder<any> {
        return container.resolve(ActivityBootBuilderToken);
    }

}
