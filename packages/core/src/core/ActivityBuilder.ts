import { IActivityBuilder, ActivityBuilderToken } from './IActivityBuilder';
import {
    Type, isFunction, isString,
    Token, Registration, Express, isToken, getClassName, Injectable, IContainer
} from '@ts-ioc/core';
import { IConfigure, isActivityResultType, ActivityType, ExpressionType, Expression } from './IConfigure';
import { IActivity, ActivityToken } from './IActivity';
import { Activity } from './Activity';
import { IocModule, ModuleBuilder, MdlInstance } from '@ts-ioc/bootstrap';
import { AssignActivity } from './ExpressionActivity';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Injectable(ActivityBuilderToken)
export class ActivityBuilder extends ModuleBuilder<IActivity> implements IActivityBuilder {

    constructor() {
        super()
    }

    async build(activity: ActivityType<IActivity>, container?: IContainer, uuid?: string): Promise<IActivity> {
        let instance = await super.build(activity, container);
        instance.id = uuid;
        return instance;
    }

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

    protected resolveToken(token: Token<IActivity>, uuid?: string): IActivity {
        let activity = this.container.resolve(token);
        activity.id = uuid;
        return activity;
    }

    // getDecorator() {
    //     return Task.toString();
    // }


    getDefaultAcitvity(): Type<IActivity> {
        return Activity;
    }


    protected async toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>> {
        if (isActivityResultType(exptype)) {
            return await this.build(exptype, target.id) as AssignActivity<T>;
        } else {
            return exptype;
        }
    }

    protected async toActivity<Tr, Ta extends IActivity, TCfg extends IConfigure>(exptype: ExpressionType<Tr> | ActivityType<Ta>, target: IActivity, isRightActivity: Express<any, boolean>, toConfig: Express<Tr, TCfg>, valify?: Express<TCfg, TCfg>): Promise<Ta> {
        let result;
        if (isActivityResultType(exptype, !valify)) {
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

    protected getBootstrapToken(iocModule: IocModule<IActivity>): Token<IActivity> {
        let token = iocModule.bootstrap || iocModule.moduleToken;
        if (isString(token)) {
            token = this.traslateStrToken(iocModule.container, token);
        }
        return token;
    }


    protected traslateStrToken(container: IContainer, token: string): Token<IActivity> {
        let taskToken = new Registration(ActivityToken, token);
        if (container.has(taskToken)) {
            return taskToken;
        }
        return token;
    }

}
