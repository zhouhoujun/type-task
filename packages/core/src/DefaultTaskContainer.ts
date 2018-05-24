import { isArray, IContainer, IContainerBuilder, Type, Inject, Mode, Providers, isClass, ContainerBuilderToken, ModuleBuilder, Token, ApplicationBuilder, IApplicationBuilder } from '@ts-ioc/core';
import { ITaskRunner, IConfigure, TaskRunnerToken, ITask } from './core/index';
import { ITaskContainer, TaskContainerToken } from './ITaskContainer';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';



/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
export class DefaultTaskContainer<T extends ITask> extends ApplicationBuilder<T> implements IApplicationBuilder<T> {

    constructor(public rootPath: string) {
        super(rootPath)
    }


    protected async initContainer(config: T, container: IContainer) {
        this.registerExt(container);
        await super.initContainer(config, container);
        return container;
    }

    protected setConfigRoot(config: IConfigure<T>) {
        config.rootdir = this.rootPath;
    }

    protected registerExt(container: IContainer) {
        if (!container.has(AopModule)) {
            container.register(AopModule);
        }
        if (!container.has(LogModule)) {
            container.register(LogModule);
        }

        container.bindProvider(TaskContainerToken, this);
        if (!container.has(CoreModule)) {
            container.register(CoreModule);
        }
    }

}

