import { IBuilder, BuilderToken } from './IBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, hasOwnClassMetadata, isFunction, Inject, IContainer, Injectable, Providers, Singleton, isArray, isClass } from '@ts-ioc/core';
import { Task } from './decorators/index';
import { IConfigure } from './IConfigure';
import { ITaskContext } from '../ITaskContext';
import { TaskType } from '../utils/index';
import { ITask } from './ITask';
import { TaskContextToken } from '../ITaskContext';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(BuilderToken)
export class Builder implements IBuilder {

    @Inject(TaskContextToken)
    context: ITaskContext;

    constructor() {

    }

    async build(config: IConfigure, root?: ITaskComponent): Promise<ITaskComponent> {
        let component;
        if (config.task) {
            component = await this.buildComponent(config);
        }
        if (component) {
            if (root) {
                root.add(component)
            } else {
                root = component;
            }
        } else {
            component = root || config.moduleTarget;
        }

        if (config.children && config.children.length) {
            await this.buildChildren(component, this.toConfigures(config.children))
        }
        return root;
    }

    toConfigures(children: (IConfigure | Type<ITask>)[]): IConfigure[] {
        return children.map(cfg => isClass(cfg) ? { task: cfg } : cfg);
    }

    async buildChildren(parent: ITaskComponent, configs: IConfigure[]) {
        if (!isFunction(parent.add)) {
            return;
        }
        await Promise.all(configs.map(async ctx => {
            let node = await this.buildComponent(ctx);
            if (!node) {
                return;
            }
            parent.add(node);
            if (ctx.children && ctx.children.length) {
               await this.buildChildren(node, this.toConfigures(ctx.children));
            }
        }));
    }

    async loadModules(modules: TaskType | TaskType[]) {
        if (isArray(modules)) {
            await Promise.all(modules.map(md => this.context.containerBuilder.loadModule(this.context.container, isClass(md) ? { modules: [md] } : md)));
        } else {
            await this.context.containerBuilder.loadModule(this.context.container, isClass(modules) ? { modules: [modules] } : modules);
        }
    }

    async buildComponent(config: IConfigure): Promise<ITaskComponent> {
        if (config.loader) {
            await this.loadModules(config.loader);
        }
        if (config.task) {
            if (!this.context.container.has(config.task) && isClass(config.task)) {
                this.context.container.register(config.task);
            }
            let providers = isArray(config.providers) ? config.providers : [config.providers];
            return this.context.container.resolve<ITaskComponent>(config.task, ...providers);
        }
        return null
    }
}
