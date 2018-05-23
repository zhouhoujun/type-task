import { isArray, IContainer, IContainerBuilder, Type, Inject, Mode, Providers, isClass, ContainerBuilderToken, ModuleBuilder } from '@ts-ioc/core';
import { BootstrapTask, ITaskRunner, IConfigure, TaskRunnerToken } from './core/index';
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
export class DefaultTaskContainer extends ModuleBuilder<IConfigure> implements ITaskContainer {

    constructor(public rootPath: string) {
        super()
    }

    /**
     * bootstrap task.
     *
     * @param {BootstrapTask} [tasks]
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof DefaultTaskContainer
     */
    async bootstrap<T>(task?: Type<T>): Promise<T> {
        let taskInstance = await this.bootstrap(task);
        return taskInstance;
    }

    protected async initContainer(config: IConfigure, container: IContainer) {
        this.registerExt(container);
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

