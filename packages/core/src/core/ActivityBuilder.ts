import { IActivityBuilder, ActivityBuilderToken } from './IActivityBuilder';
import { Type, isFunction, Inject, IContainer, Singleton, isString, ContainerToken, isToken, isMetadataObject, Token, ModuleBuilder, Registration, isClass, getTypeMetadata, lang } from '@ts-ioc/core';
import { IConfigure, ActivityResultType, isActivityType } from './IConfigure';
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

    protected async toExpression<T>(exptype: ExpressionType<T>, activity: IActivity<any>): Promise<Expression<T>> {
        if (isActivityType(exptype)) {
            return await this.build(exptype, activity.id);
        } else {
            return exptype;
        }
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
