import { isArray, Token, IContainer, IContainerBuilder, ContainerBuilder, symbols, AsyncLoadOptions, Type, Inject, Express, Mode, Providers, isClass, isToken, hasOwnClassMetadata, isFunction, isNodejsEnv } from 'tsioc';
import { taskSymbols } from './utils/index';
import { ITask, IBuilder, IConfigure, BootsrapTask, registerTaskCoreDecorators, Task, TaskModule } from './core/index';
import { ITaskContainer } from './ITaskContainer';
import { TaskLog } from './aop/TaskLog';
import { registerTaskModules } from './tasks';
import chalk from 'chalk';
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
     * create task container.
     *
     * @static
     * @param {string} root
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {ITaskContainer}
     * @memberof TaskContainer
     */
    static create(root: string, ...modules: (Type<any> | AsyncLoadOptions)[]): ITaskContainer {
        let taskContainer = new TaskContainer(root);
        if (modules) {
            taskContainer.use(...modules);
        }
        return taskContainer;
    }

    /**
     * use modules
     *
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {this}
     * @memberof TaskContainer
     */
    use(...modules: (Type<any> | AsyncLoadOptions)[]): this {
        this.useModules.push(...modules.map(itm => isClass(itm) ? { modules: [itm] } : itm));
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
     * @param {BootsrapTask} tasks
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof TaskContainer
     */
    bootstrap(tasks: BootsrapTask, ...providers: Providers[]): Promise<any> {
        let builder = this.containerBuilder;
        let start, end;
        start = process.hrtime();
        console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Starting'), '...');

        return Promise.all(this.useModules.map(option => {
            return builder.loadModule(this.container, option);
        })).then((types) => {
            if (isArray(tasks)) {
                let seq = Promise.resolve();
                tasks.forEach(task => {
                    seq = seq.then(data => {
                        return this.runTask(task, ...providers);
                    })
                });
                return seq;
            } else {
                return this.runTask(tasks, ...providers);
            }
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
                    return err;
                });
    }

    protected runTask(task: IConfigure | Token<any>, ...providers: Providers[]): Promise<any> {
        if (isToken(task)) {
            if (!this.container.has(task)) {
                if (isClass(task) && this.isTask(task)) {
                    this.container.register(task);
                } else {
                    return Promise.reject(`${typeof task} is not vaild task type.`);
                }
            }
            let instance = this.container.resolve(task, ...providers);
            if (isFunction(instance.run)) {
                return instance.run();
            } else if (instance.config && isClass(instance.config.task) && this.isTask(instance.config.task)) {
                let ctx = instance.config as IConfigure;
                return this.runContext(ctx);
            } else {
                return Promise.reject(`${JSON.stringify(instance)} is not vaild task instance.`);
            }

        } else {
            return this.runContext(task);
        }
    }

    protected runContext(ctx: IConfigure) {
        return this.container.resolve<IBuilder>(ctx.builder || taskSymbols.IBuilder)
            .build(ctx)
            .then(task => {
                return task.run();
            });
    }

    protected registerExt(container: IContainer) {
        container.register(this.log || TaskLog);
        container.registerSingleton(taskSymbols.TaskContainer, this);
        registerTaskCoreDecorators(container);
        registerTaskModules(container);
    }

    protected isTask(task: Type<ITask>): boolean {
        return hasOwnClassMetadata(Task, task) || hasOwnClassMetadata(TaskModule, task);
    }
}

