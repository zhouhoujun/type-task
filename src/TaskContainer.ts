import { isArray, IContainer, IContainerBuilder,  Type, Inject, Mode, Providers, isClass, LoadType, ContainerBuilderToken } from '@ts-ioc/core';
import { taskSymbols } from './utils/index';
import { BootsrapTask, registerTaskCoreDecorators, ITaskRunner } from './core/index';
import { ITaskContainer } from './ITaskContainer';
import { TaskLogAspect } from './aop/index';
import { registerTaskModules } from './tasks/index';
import chalk from 'chalk';
import { ITaskContext } from './ITaskContext';
import { ContainerBuilder } from '@ts-ioc/platform-server';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';

const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
/**
 * task container.
 *
 * @export
 * @class TaskManager
 */
export class TaskContainer implements ITaskContainer {

    container: IContainer;
    containerBuilder: IContainerBuilder;
    protected log: Type<any>;

    protected useModules: LoadType[];

    constructor(public rootPath: string, container?: IContainer) {
        this.useModules = [];
        if (!container) {
            let builder = new ContainerBuilder();
            this.container = builder.create();
            this.containerBuilder = builder;
        } else {
            this.container = container;
            this.containerBuilder = container.get<IContainerBuilder>(ContainerBuilderToken);
        }

        this.registerExt(this.container);
    }

    /**
     * create task container.
     *
     * @static
     * @param {string} root
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {ITaskContainer}
     * @memberof TaskContainer
     */
    static create(root: string, ...modules: LoadType[]): ITaskContainer {
        let taskContainer = new TaskContainer(root);
        if (modules) {
            taskContainer.use(...modules);
        }
        return taskContainer;
    }

    /**
     * use modules
     *
     * @param {...LoadType[]} modules
     * @returns {this}
     * @memberof TaskContainer
     */
    use(...modules: LoadType[]): this {
        this.useModules.push(...modules);
        return this;
    }

    /**
     * use logger.
     *
     * @param {Type<any>} logger
     * @memberof TaskContainer
     */
    useLogger(logger: Type<any>) {
        this.log = logger;
    }

    /**
     * bootstrap task.
     *
     * @param {BootsrapTask} [tasks]
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof TaskContainer
     */
    bootstrap(tasks?: BootsrapTask, ...providers: Providers[]): Promise<any> {
        let builder = this.containerBuilder;
        let start, end;
        start = process.hrtime();
        console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Starting'), '...');

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

        })
            .then(
                data => {
                    end = prettyTime(process.hrtime(start));
                    console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Finished'), ' after ', chalk.magenta(end));
                    return data;
                },
                err => {
                    end = prettyTime(process.hrtime(start));
                    console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Finished'), chalk.red('errored after'), chalk.magenta(end));
                    console.error(err);
                    return err;
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
        container.register(this.log || TaskLogAspect);
        registerTaskCoreDecorators(container);
        registerTaskModules(container);
    }

}

