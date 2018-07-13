import { IActivityBuilder, ActivityBuilderToken } from './IActivityBuilder';
import { Type, isFunction, Inject, IContainer, Singleton, isString, ContainerToken, Token, ModuleBuilder, Registration, isClass, getTypeMetadata, lang, Express, isToken } from '@ts-ioc/core';
import { IConfigure, ActivityResultType, isActivityType, ActivityType } from './IConfigure';
import { IActivity, ActivityToken } from './IActivity';
import { Task } from './decorators';
import { TaskMetadata } from './metadatas';
import { Activity } from '../activities';
import { ExpressionType, Expression } from './IContext';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(ActivityBuilderToken)
export class ActivityBuilder extends ModuleBuilder<IActivity<any>> implements IActivityBuilder {

    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async build<T>(task: ActivityResultType<T>, uuid: string): Promise<IActivity<T>> {
        let taskInst = await super.build(task);

        if (!taskInst || !(taskInst instanceof Activity)) {
            throw new Error('builder task instance failed.');
        }

        taskInst.id = uuid;

        let config = this.getConfigure(task) as IConfigure;
        if (isFunction(taskInst['onTaskInit'])) {
            taskInst['onTaskInit'](config);
        }
        let ctxbuider = this.getBuilder(config);

        await ctxbuider.buildStrategy(taskInst, config);

        return taskInst;
    }

    async buildStrategy<T>(activity: IActivity<T>, config: IConfigure): Promise<IActivity<T>> {
        if (config.name) {
            activity.name = config.name;
        }
        activity.config = config;
        return activity;
    }

    getConfigure(token?: Token<any> | IConfigure, moduleDecorator?: Function | string): IConfigure {
        return super.getConfigure(token, moduleDecorator || Task);
    }

    getBuilder(cfg: IConfigure): IActivityBuilder {
        let builder: IActivityBuilder;
        if (cfg.builder) {
            builder = this.getBuilderViaConfig(cfg.builder);
        }
        if (!builder && cfg.task) {
            builder = this.getBuilderViaTask(cfg.task);
        }
        return builder || this;
    }

    protected async toExpression<T>(exptype: ExpressionType<T>, target: IActivity<any>): Promise<Expression<T>> {
        if (isActivityType(exptype)) {
            return await this.build(exptype, target.id);
        } else {
            return exptype;
        }
    }

    protected async toActivity<Tr, Ta extends IActivity<any>>(exptype: ExpressionType<Tr> | ActivityType<Ta>, target: IActivity<any>, isRightActivity: Express<any, boolean>, toConfig: Express<Tr, IConfigure>, valify?: Express<IConfigure, IConfigure>): Promise<Ta> {
        let result;
        if (isActivityType(exptype, !valify)) {
            if (valify) {
                result = await this.build(isToken(exptype) ? exptype : valify(exptype), target.id);
            } else {
                result = await this.build(exptype, target.id);
            }
        } else {
            result = exptype;
        }

        if (isRightActivity(result)) {
            return result;
        }

        let rt = await target.context.exec(target, result);
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

    protected getBuilderViaConfig(builder: Token<IActivityBuilder> | IActivityBuilder): IActivityBuilder {
        if (isToken(builder)) {
            return this.container.resolve(builder);
        } else if (builder instanceof ActivityBuilder) {
            return builder;
        }
        return null;
    }

    protected getBuilderViaTask(task: Token<IActivity<any>>): IActivityBuilder {
        if (isToken(task)) {
            let taskType = isClass(task) ? task : this.container.getTokenImpl(task);
            if (taskType) {
                let meta = lang.first(getTypeMetadata<TaskMetadata>(Task, taskType));
                if (meta && meta.builder) {
                    return isToken(meta.builder) ? this.container.resolve(meta.builder) : meta.builder;
                }
            }
        }
        return null;
    }

    protected getBootstrapToken(cfg: IConfigure, token?: Token<IActivity<any>> | Type<any>): Token<IActivity<any>> {
        let bootstrapToken = cfg.task || cfg.bootstrap || token;
        if (isString(bootstrapToken)) {
            bootstrapToken = this.traslateStrToken(bootstrapToken);
        }
        return bootstrapToken;
    }

    protected traslateStrToken(token: string): Token<IActivity<any>> {
        let taskToken = new Registration(ActivityToken, token);
        if (this.container.has(taskToken)) {
            return taskToken;
        }
        return token;
    }

}
