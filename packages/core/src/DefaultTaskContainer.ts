import { isArray, IContainer, IContainerBuilder, Type, Inject, Mode, Providers, isClass, ContainerBuilderToken, ModuleBuilder, Token } from '@ts-ioc/core';
import { BootstrapTask, ITaskRunner, IConfigure, TaskRunnerToken, ITask } from './core/index';
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
export class DefaultTaskContainer<T extends IConfigure> extends ModuleBuilder<T> implements ITaskContainer<T> {

    constructor(public rootPath: string) {
        super()
    }

    /**
     * bootstrap task.
     *
     * @param {(Token<ITask> | T)} [tasks]
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof DefaultTaskContainer
     */
    async bootstrap(task?: Token<ITask> | T): Promise<ITask> {
        let taskInstance = await this.bootstrap(task);
        return taskInstance;
    }

    protected async initContainer(config: T, container: IContainer) {
        this.registerExt(container);
        await super.initContainer(config, container);
        return container;
    }

    protected setConfigRoot(config: T) {
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

