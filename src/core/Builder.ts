import { IBuilder } from './IBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, hasOwnClassMetadata, Inject, symbols, IContainer, Injectable, Providers, Singleton, isArray, isClass } from 'tsioc';
import { Task } from './decorators/index';
import { IConfigure } from './IConfigure';
import { ITaskContext } from '../ITaskContext';
import { taskSymbols, TaskType } from '../utils/index';
import { ITask } from './ITask';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(taskSymbols.IBuilder)
export class Builder implements IBuilder {

    @Inject(taskSymbols.ITaskContext)
    context: ITaskContext;

    constructor() {

    }

    async build(config: IConfigure, root?: ITaskComponent): Promise<ITaskComponent> {
        let component = await this.buildComponent(config);
        if (root) {
            root.add(component)
        } else {
            root = component;
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
        await Promise.all(configs.map(async ctx => {
            let node = await this.buildComponent(ctx);
            parent.add(node);
            if (ctx.children && ctx.children.length) {
                this.buildChildren(node, this.toConfigures(ctx.children));
            }
            return parent;
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
        await this.loadModules(config.loader);
        if (!this.context.container.has(config.task) && isClass(config.task)) {
            this.context.container.register(config.task);
        }
        let providers = isArray(config.providers) ? config.providers : [config.providers];

        return this.context.container.resolve<ITaskComponent>(config.task, ...providers);
    }
}
