import { ITaskBuilder, TaskBuilderToken } from './ITaskBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, isFunction, Inject, IContainer, Singleton, isString, ContainerToken, isToken, isMetadataObject, Token, ModuleBuilder, Registration } from '@ts-ioc/core';
import { IConfigure, TaskType } from './IConfigure';
import { ITask, TaskToken } from './ITask';
import { TaskElement } from './TaskElement';
import { TaskComponent } from './TaskComponent';
import { Task } from './decorators/index';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(TaskBuilderToken)
export class TaskBuilder extends ModuleBuilder<ITask> implements ITaskBuilder {

    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async build<T extends ITask>(task: TaskType<ITask>): Promise<T> {
        let taskInst = await super.build(task) as T;

        if (!taskInst) {
            throw new Error('builder task instance failed.');
        }

        let config = this.getConfigure(task) as IConfigure;
        let ctxbuider = this.getConfigBuilder(config);

        if (isFunction(taskInst['onTaskInit'])) {
            taskInst['onTaskInit'](config);
        }

        await ctxbuider.buildWithConfigure(taskInst, config);
        return taskInst;
    }

    async buildWithConfigure(taskInst: ITask, config: IConfigure): Promise<ITask> {
        await this.beforeBindConfig(taskInst, config);
        if (taskInst instanceof TaskComponent) {
            if (config.children && config.children.length) {
                await this.buildChildren(taskInst, config.children)
            }
        }
        await this.afterBindConfig(taskInst, config);
        return taskInst;
    }

    async beforeBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        if (config.name) {
            taskInst.name = config.name;
        }
        if (config.runWay) {
            taskInst.runWay = config.runWay;
        }

        return taskInst;
    }

    async afterBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        return taskInst;
    }


    async buildChildren<T extends ITaskComponent>(parent: T, configs: (IConfigure | Token<ITask>)[]) {
        if (!isFunction(parent.add)) {
            return;
        }
        await Promise.all(configs.map(async cfg => {
            let node = await this.build(cfg) as T;
            if (!node) {
                return;
            }
            parent.add(node);
            if (node instanceof TaskComponent) {
                if (!isToken(cfg) && cfg.children && cfg.children.length) {
                    await this.buildChildren(node, cfg.children);
                }
            }
        }));
    }

    async buildComponent<T extends ITask>(child: IConfigure | Token<T>): Promise<T> {
        let component: T;
        if (isToken(child)) {
            component = await this.build(child)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        } else if (isMetadataObject(child)) {
            let config = child as IConfigure;
            if (config.imports) {
                await this.container.loadModule(...config.imports);
            }
            if (!config.children && !(config.task || config.bootstrap)) {
                return null;
            }
            if (!config.bootstrap) {
                config.task = config.task || TaskElement;
            }

            component = await this.build(config)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        } else {
            component = null;
        }

        return component;

    }

    getConfigure(token?: Token<any> | IConfigure, moduleDecorator?: Function | string): IConfigure {
        return super.getConfigure(token, moduleDecorator || Task);
    }

    protected getBootstrapToken(cfg: IConfigure, token?: Token<ITask> | Type<any>): Token<ITask> {
        let bootstrapToken = cfg.task || cfg.bootstrap || token;
        if (isString(bootstrapToken)) {
            bootstrapToken = this.traslateStrToken(bootstrapToken);
        }
        return bootstrapToken;
    }

    protected traslateStrToken(token: string): Token<ITask> {
        let taskToken = new Registration(TaskToken, token);
        if (this.container.has(taskToken)) {
            return taskToken;
        }
        return token;
    }

    protected getConfigBuilder(cfg: IConfigure): ITaskBuilder {
        if (cfg.builder) {
            if (isToken(cfg.builder)) {
                return this.container.resolve(cfg.builder);
            } else if (cfg.builder instanceof TaskBuilder) {
                return cfg.builder;
            }
        }
        return this;
    }

}
