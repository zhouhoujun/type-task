import { isArray, IContainer, IContainerBuilder, Platform, IPlatform, Type, Inject, Mode, Providers, isClass, ContainerBuilderToken, AppConfiguration } from '@ts-ioc/core';
import { BootstrapTask, ITaskRunner, IConfigure, TaskRunnerToken } from './core/index';
import { ITaskContainer, TaskContainerToken } from './ITaskContainer';
import { ITaskContext, TaskContextToken } from './ITaskContext';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { DefaultTaskContext } from './DefaultTaskContext';
import { CoreModule } from './CoreModule';



/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
export class DefaultTaskContainer extends Platform implements ITaskContainer {

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
    async bootstrap(tasks?: BootstrapTask, ...providers: Providers[]): Promise<any> {

        // check has default task context registered.

        let container = await this.build();

        if (!tasks) {
            let tasks = container.resolve(TaskContextToken)
                .getRunTasks();
        }
        if (!isArray(tasks)) {
            tasks = [tasks];
        }
        let seq = Promise.resolve();
        let runner = container.get(TaskRunnerToken);
        tasks.forEach(task => {
            seq = seq.then(data => {
                return runner.runTask(task, data, ...providers);
            })
        });
        let result = await seq;
        return result;
    }

    protected async initIContainer(config: AppConfiguration, container: IContainer) {
        await super.initIContainer(config, container);
        if (!container.has(TaskContextToken)) {
            container.register(TaskContextToken, DefaultTaskContext);
        }
        return container;
    }

    protected setRootdir(config: AppConfiguration) {
        config.rootdir = this.rootPath;
    }

    protected registerExt(container: IContainer) {
        if (!container.has(AopModule)) {
            container.register(AopModule);
        }
        if (!container.has(LogModule)) {
            container.register(LogModule);
        }

        container.registerSingleton(TaskContainerToken, this);
        if (!container.has(CoreModule)) {
            container.register(CoreModule);
        }
    }

}

