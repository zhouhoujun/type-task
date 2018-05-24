import { ITaskBuilder, BuilderToken } from './IBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, hasOwnClassMetadata, isFunction, Inject, IContainer, Injectable, Providers, Singleton, isArray, isClass, ContainerToken, ModuleBuilderToken, IModuleBuilder, isToken, isBaseObject, isMetadataObject, Token, ModuleBuilder } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { TaskType } from '../utils/index';
import { ITask } from './ITask';
import { TaskElement } from './TaskElement';

/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(BuilderToken)
export class TaskBuilder<T extends ITask> extends ModuleBuilder<T> implements ITaskBuilder<T> {

    constructor(@Inject(ContainerToken) container: IContainer) {
        super();
        this.useContainer(container);
    }

    async build(task: Token<T> | Type<any> | IConfigure<T>, root?: ITaskComponent): Promise<T> {
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
            await this.buildChildren(component, config.children)
        }
        return root;
    }


    async buildChildren(parent: ITaskComponent, configs: IConfigure<ITask>[]) {
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
                await this.buildChildren(node, ctx.children);
            }
        }));
    }

    async buildComponent(child: IConfigure<ITask> | ITask): Promise<ITaskComponent> {
        let component: ITaskComponent;
        if (isToken(child)) {
            component = await this.moduleBuiler.build(child)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        } else if (isMetadataObject(child)) {
            let config = child as IConfigure<ITask>;
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
