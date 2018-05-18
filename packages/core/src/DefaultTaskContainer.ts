import { isArray, IContainer, IContainerBuilder, AsyncLoadOptions, Type, Inject, Mode, Providers, isClass, ContainerBuilderToken } from '@ts-ioc/core';
import { BootstrapTask, ITaskRunner, IConfigure, TaskRunnerToken } from './core/index';
import { ITaskContainer, TaskContainerToken } from './ITaskContainer';
import { ITaskContext, TaskContextToken } from './ITaskContext';
import { ContainerBuilder } from '@ts-ioc/platform-server';
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
export class DefaultTaskContainer implements ITaskContainer {

    container: IContainer;
    containerBuilder: IContainerBuilder;
    protected log: Type<any>;

    protected useModules: AsyncLoadOptions[];

    constructor(public rootPath: string, container?: IContainer) {
        this.useModules = [];
        if (!container) {
            let builder = new ContainerBuilder();
            this.container = builder.create();
            this.containerBuilder = builder;
        } else {
            this.container = container;
            this.containerBuilder = container.get(ContainerBuilderToken);
        }

        this.registerExt(this.container);
    }

    /**
     * use modules
     *
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {this}
     * @memberof DefaultTaskContainer
     */
    use(...modules: (Type<any> | AsyncLoadOptions)[]): this {
        this.useModules.push(...modules.map(itm => isClass(itm) ? { modules: [itm] } : itm));
        return this;
    }

    useConfigure(config: IConfigure) {

    }

    /**
     * use logger.
     *
     * @param {Type<any>} logger
     * @memberof DefaultTaskContainer
     */
    useLogger(logger: Type<any>) {
        this.log = logger;
    }

    /**
     * bootstrap task.
     *
     * @param {BootstrapTask} [tasks]
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof DefaultTaskContainer
     */
    bootstrap(tasks?: BootstrapTask, ...providers: Providers[]): Promise<any> {
        let builder = this.containerBuilder;

        // check has default task context registered.
        if (!this.container.has(TaskContextToken)) {
            this.container.register(TaskContextToken, DefaultTaskContext);
        }

        return Promise.all(this.useModules.map(option => {
            return builder.loadModule(this.container, option);
        })).then((types) => {
            if (!tasks) {
                let tasks = this.container.resolve(TaskContextToken)
                    .getRunTasks();
            }
            if (!isArray(tasks)) {
                tasks = [tasks];
            }
            let seq = Promise.resolve();
            let runner = this.container.get(TaskRunnerToken);
            tasks.forEach(task => {
                seq = seq.then(data => {
                    return runner.runTask(task, data, ...providers);
                })
            });
            return seq;

        });
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

