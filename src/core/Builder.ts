import { IBuilder } from './IBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, hasOwnClassMetadata, Inject, symbols, IContainer, Injectable, Providers, Singleton, isArray, isClass } from 'tsioc';
import { Task } from './decorators/index';
import { IContext } from './IContext';
import { ITaskContainer } from '../ITaskContainer';
import { taskSymbols, TaskType } from '../utils/index';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(taskSymbols.IBuilder)
export class Builder implements IBuilder {

    @Inject(taskSymbols.TaskContainer)
    taskContainer: ITaskContainer;

    constructor() {

    }

    async build(context: IContext, root?: ITaskComponent): Promise<ITaskComponent> {
        let component = await this.buildComponent(context);
        if (root) {
            root.add(component)
        } else {
            root = component;
        }

        if (context.children && context.children.length) {
            await this.buildChildren(component, context.children)
        }
        return root;
    }

    async buildChildren(parent: ITaskComponent, contexts: IContext[]) {
        await Promise.all(contexts.map(async ctx => {
            let node = await this.buildComponent(ctx);
            parent.add(node);
            if (ctx.children && ctx.children.length) {
                this.buildChildren(node, ctx.children);
            }
            return parent;
        }));
    }

    async loadModules(modules: TaskType | TaskType[]) {
        if (isArray(modules)) {
            await Promise.all(modules.map(md => this.taskContainer.containerBuilder.loadModule(this.taskContainer.container, isClass(md) ? { modules: [md] } : md)));
        } else {
            await this.taskContainer.containerBuilder.loadModule(this.taskContainer.container, isClass(modules) ? { modules: [modules] } : modules);
        }
    }

    async buildComponent(context: IContext): Promise<ITaskComponent> {
        await this.loadModules(context.loader);
        if (!this.taskContainer.container.has(context.task) && isClass(context.task)) {
            this.taskContainer.container.register(context.task);
        }
        let providers = isArray(context.providers) ? context.providers : [context.providers];

        return this.taskContainer.container.resolve<ITaskComponent>(context.task, ...providers);
    }
}
