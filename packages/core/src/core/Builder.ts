import { ITaskBuilder, BuilderToken } from './IBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, hasOwnClassMetadata, isFunction, Inject, IContainer, Injectable, Providers, Singleton, isArray, isClass, ContainerToken, ModuleBuilderToken, IModuleBuilder, isToken, isBaseObject, isMetadataObject, Token, ModuleBuilder } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { TaskType } from '../utils/index';
import { ITask } from './ITask';
import { TaskElement } from './TaskElement';
import { TaskComponent } from '.';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(BuilderToken)
export class TaskBuilder implements ITaskBuilder {

    constructor(@Inject(ContainerToken) private container: IContainer) {

    }

    private _moduleBuiler: IModuleBuilder<ITask>;
    get moduleBuiler(): IModuleBuilder<ITask> {
        if (!this._moduleBuiler) {
            this._moduleBuiler = this.container.get(ModuleBuilderToken);
        }
        return this._moduleBuiler;
    }

    async build<T extends ITask>(task: Token<T> | Type<any> | IConfigure<T>): Promise<T> {

        let taskInst = await this.moduleBuiler.build(task) as T;

        if (taskInst instanceof TaskComponent) {
            let config = this.moduleBuiler.getConfigure(task) as IConfigure<T>;
            if (config.children && config.children.length) {
                await this.buildChildren(taskInst, config.children)
            }
        }
        return taskInst;
    }


    async buildChildren<T extends ITaskComponent>(parent: T, configs: IConfigure<ITask>[]) {
        if (!isFunction(parent.add)) {
            return;
        }
        await Promise.all(configs.map(async cfg => {
            let node = await this.moduleBuiler.build(cfg) as T;
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

    async buildComponent<T extends ITask>(child: IConfigure<T> | T): Promise<T> {
        let component: T;
        if (isToken(child)) {
            component = await this.moduleBuiler.build(child)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        } else if (isMetadataObject(child)) {
            let config = child as IConfigure<T>;
            if (config.imports) {
                await this.container.loadModule(...config.imports);
            }
            if (!config.children && !config.bootstrap) {
                return null;
            }
            config.bootstrap = config.bootstrap || TaskElement;

            component = await this.moduleBuiler.build(config)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        } else {
            component = null;
        }

        return component;

    }
}
