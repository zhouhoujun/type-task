import { isArray, IContainer, IContainerBuilder, Type, Inject, Mode, Providers, isClass, ContainerBuilderToken, ModuleBuilder, Token, ApplicationBuilder, IApplicationBuilder, hasClassMetadata, ModuleBuilderToken, IModuleBuilder } from '@ts-ioc/core';
import { ITaskRunner, IConfigure, TaskRunnerToken, ITask } from './core/index';
import { ITaskContainer, TaskContainerToken } from './ITaskContainer';
import { AopModule, Aspect } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';


/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
export class DefaultTaskContainer extends ApplicationBuilder<ITask> implements ITaskContainer {

    protected logAspect: Type<any>;
    constructor(public rootPath: string) {
        super(rootPath)
    }

    useLog(logAspect: Type<any>): this {
        if (hasClassMetadata(Aspect, logAspect)) {
            this.logAspect = logAspect;
        } else {
            console.error('logAspect param is not right aspect');
        }
        return this;
    }

    /**
     * bootstrap application via main module
     *
     * @param {(Token<ITask> | Type<any> | IConfigure)} bootModule
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    bootstrap(task: Token<ITask> | Type<any> | IConfigure): Promise<ITask> {
        return super.bootstrap(task);
    }

    getRootPath() {
        return this.rootPath;
    }

    protected createModuleBuilder(): IModuleBuilder<ITask> {
        return this.getContainer().get(ModuleBuilderToken, 'task');
    }


    protected async initContainer(config: IConfigure, container: IContainer) {
        this.registerExt(container);
        container.bindProvider(TaskContainerToken, this);
        await super.initContainer(config, container);
        return container;
    }

    protected setConfigRoot(config: IConfigure) {
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

