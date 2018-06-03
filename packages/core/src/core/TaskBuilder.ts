import { ITaskBuilder, TaskBuilderToken } from './ITaskBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, hasOwnClassMetadata, isFunction, Inject, IContainer, Injectable, Providers, Singleton, isArray, isClass, ContainerToken, ModuleBuilderToken, IModuleBuilder, isToken, isBaseObject, isMetadataObject, Token, ModuleBuilder, ModuleConfiguration, lang } from '@ts-ioc/core';
import { IConfigure, TaskType } from './IConfigure';
import { ITask } from './ITask';
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
        let config = this.getConfigure(task) as IConfigure;
        await this.buildWithConfigure(taskInst, config);
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
        taskInst.config = config;
        return taskInst;
    }

    async afterBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        return taskInst;
    }


    async buildChildren<T extends ITaskComponent>(parent: T, configs: IConfigure[]) {
        if (!isFunction(parent.add)) {
            return;
        }
        await Promise.all(configs.map(async cfg => {
            if (cfg.task) {
                cfg.bootstrap = cfg.task;
            }
            let node = await this.build(cfg) as T;
            if (!node) {
                return;
            }
            parent.add(node);
            if (node instanceof TaskComponent) {
                if (cfg.children && cfg.children.length) {
                    await this.buildChildren(node, cfg.children);
                }
            }
        }));
    }

    async buildComponent<T extends ITask>(child: IConfigure | T): Promise<T> {
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
            if (!config.children && !config.bootstrap) {
                return null;
            }
            config.bootstrap = config.bootstrap || TaskElement;

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

    getConfigure(modules?: Token<any> | IConfigure, moduleDecorator?: Function | string): IConfigure {
        let cfg: IConfigure;
        if (isClass(modules)) {
            cfg = this.getMetaConfig(modules, moduleDecorator || Task);
        } else if (!isToken(modules)) {
            cfg = modules as IConfigure;
            let token = this.getBootstrapToken(cfg);
            if (isClass(token)) {
                cfg = lang.assign({}, this.getMetaConfig(token, moduleDecorator || Task), cfg || {});
            }
        }
        return cfg || {};
    }

    protected getBootstrapToken(cfg: IConfigure, token?: Token<ITask> | Type<any>): Token<ITask> {
        return cfg.task || cfg.bootstrap || token;
    }

}
