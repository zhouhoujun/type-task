import { IBuilder, BuilderToken } from './IBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, hasOwnClassMetadata, isFunction, Inject, IContainer, Injectable, Providers, Singleton, isArray, isClass, ContainerToken, ModuleBuilderToken, IModuleBuilder, isToken } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';
import { TaskType } from '../utils/index';
import { ITask } from './ITask';
import { TaskElement } from '.';
/**
 * builder.
 *
 * @export
 * @class Builder
 * @implements {IBuilder}
 */
@Singleton(BuilderToken)
export class Builder implements IBuilder {

    @Inject(ContainerToken)
    container: IContainer;

    @Inject(ModuleBuilderToken)
    moduleBuiler: IModuleBuilder<IConfigure>;

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
            await this.buildChildren(component, config.children)
        }
        return root;
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
                await this.buildChildren(node, ctx.children);
            }
        }));
    }

    async buildComponent(child: IConfigure | ITask): Promise<ITaskComponent> {
        if (isToken(child)) {
            return await this.moduleBuiler.bootstrap(child)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        } else {
            let config = child as IConfigure;
            if (config.imports) {
                await this.container.loadModule(...config.imports);
            }
            if (!config.children && !config.bootstrap) {
                return null;
            }
            config.bootstrap = config.bootstrap || TaskElement;

            return await this.moduleBuiler.bootstrap(config)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        }

    }
}
