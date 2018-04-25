import { isArray, IContainer, IContainerBuilder, symbols, AsyncLoadOptions, Type, Inject, Mode, Providers, isClass } from '@ts-ioc/core';
import { taskSymbols } from './utils/index';
import { BootstrapTask, registerTaskCoreDecorators, ITaskRunner, IConfigure } from './core/index';
import { ITaskContainer } from './ITaskContainer';
import { ITaskContext } from './ITaskContext';
import { ContainerBuilder } from '@ts-ioc/platform-server';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';


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
            this.containerBuilder = container.get<IContainerBuilder>(symbols.IContainerBuilder);
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

        return Promise.all(this.useModules.map(option => {
            return builder.loadModule(this.container, option);
        })).then((types) => {
            if (!tasks) {
                let tasks = this.container.resolve<ITaskContext>(taskSymbols.ITaskContext)
                    .getRunTasks();
            }
            if (!isArray(tasks)) {
                tasks = [tasks];
            }
            let seq = Promise.resolve();
            let runner = this.container.get<ITaskRunner>(taskSymbols.ITaskRunner);
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

        container.registerSingleton(taskSymbols.TaskContainer, this);
        registerTaskCoreDecorators(container);
    }

}

