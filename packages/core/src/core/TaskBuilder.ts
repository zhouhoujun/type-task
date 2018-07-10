import { ITaskBuilder, TaskBuilderToken } from './ITaskBuilder';
import { Type, isFunction, Inject, IContainer, Singleton, isString, ContainerToken, isToken, isMetadataObject, Token, ModuleBuilder, Registration, isClass, getTypeMetadata, lang } from '@ts-ioc/core';
import { IConfigure, TaskType } from './IConfigure';
import { IActivity, ActivityToken } from './IActivity';
import { Task } from './decorators';
import { TaskMetadata } from './metadatas';
import { Activity } from '../activities';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(TaskBuilderToken)
export class TaskBuilder extends ModuleBuilder<IActivity> implements ITaskBuilder {

    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async build<T extends IActivity>(task: TaskType<IActivity>, uuid: string): Promise<T> {
        let taskInst = await super.build(task) as T;

        if (!taskInst || !(taskInst instanceof Activity)) {
            throw new Error('builder task instance failed.');
        }

        taskInst.id = uuid;

        let config = this.getConfigure(task) as IConfigure;
        if (isFunction(taskInst['onTaskInit'])) {
            taskInst['onTaskInit'](config);
        }
        let ctxbuider = this.getBuilder(config);

        await ctxbuider.buildWithConfigure(taskInst, config);

        return taskInst;
    }

    async buildWithConfigure(taskInst: IActivity, config: IConfigure): Promise<IActivity> {
        await this.beforeBindConfig(taskInst, config);
        if (taskInst instanceof TaskComponent) {
            if (config.children && config.children.length) {
                await this.buildChildren(taskInst, config.children)
            }
        }
        await this.afterBindConfig(taskInst, config);
        return taskInst;
    }

    async beforeBindConfig(taskInst: IActivity, config: IConfigure): Promise<IActivity> {
        if (config.name) {
            taskInst.name = config.name;
        }

        return taskInst;
    }

    async afterBindConfig(taskInst: IActivity, config: IConfigure): Promise<IActivity> {
        return taskInst;
    }


    async buildChildren<T extends IActivity>(parent: T, configs: (IConfigure | Token<IActivity>)[]) {
        if (!isFunction(parent.add)) {
            return;
        }
        let children = await Promise.all(configs.map(async cfg => {
            let node = await this.build(cfg, parent.id) as T;
            if (!node) {
                return null;
            }
            if (node instanceof TaskComponent) {
                if (!isToken(cfg) && cfg.children && cfg.children.length) {
                    await this.buildChildren(node, cfg.children);
                }
            }
            return node;
        }));

        children.forEach(c => {
            c && parent.add(c);
        });

    }

    getConfigure(token?: Token<any> | IConfigure, moduleDecorator?: Function | string): IConfigure {
        return super.getConfigure(token, moduleDecorator || Task);
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

    protected getBuilder(cfg: IConfigure): ITaskBuilder {
        let builder: ITaskBuilder;
        if (cfg.builder) {
            builder = this.getBuilderViaConfig(cfg.builder);
        }
        if (!builder && cfg.task) {
            builder = this.getBuilderViaTask(cfg.task);
        }
        return builder || this;
    }

    protected getBuilderViaConfig(builder: Token<ITaskBuilder> | ITaskBuilder): ITaskBuilder {
        if (isToken(builder)) {
            return this.container.resolve(builder);
        } else if (builder instanceof TaskBuilder) {
            return builder;
        }
        return null;
    }

    protected getBuilderViaTask(task: Token<IActivity>): ITaskBuilder {
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

}
