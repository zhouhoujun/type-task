import { isArray, Token, IContainer, IContainerBuilder, ContainerBuilder, symbols, AsyncLoadOptions, Type, Inject, Express, Mode, Providers, isClass, isToken, hasOwnClassMetadata, isFunction, isNodejsEnv, NonePointcut } from 'tsioc';
import { taskSymbols } from './utils/index';
import { ITask, IBuilder, IConfigure, BootsrapTask, registerTaskCoreDecorators, Task, TaskModule } from './core/index';
import { ITaskContainer } from './ITaskContainer';
import { TaskLogAspect } from './aop/index';
import { registerTaskModules } from './tasks/index';
import chalk from 'chalk';
import { ITaskContext } from './ITaskContext';
import { Observable } from 'rxjs/Observable';
import { IScheduler } from 'rxjs/Scheduler';

const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
/**
 * task container.
 *
 * @export
 * @class TaskManager
 */
@NonePointcut
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

    getScheduler(): IScheduler {
        if (this.container.has(taskSymbols.IScheduler)) {
            return this.container.get<IScheduler>(taskSymbols.IScheduler) || undefined;
        }
        return undefined;
    }

    /**
     * bootstrap task.
     *
     * @param {BootsrapTask} [tasks]
     * @param {...Providers[]} providers
     * @returns {Observable<any>}
     * @memberof TaskContainer
     */
    bootstrap(tasks?: BootsrapTask, ...providers: Providers[]): Observable<any> {
        let builder = this.containerBuilder;
        let start, end;
        start = process.hrtime();
        console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Starting'), '...');

        let obs = this.loadModules(this.container)
            .flatMap((types) => {
                if (!tasks) {
                    let runTasks = this.container.resolve<ITaskContext>(taskSymbols.ITaskContext)
                        .getRunTasks();

                    let seq = Observable.of(null);
                    runTasks.forEach(task => {
                        seq = seq.flatMap(data => {
                            return this.runTask(task, data, ...providers);
                        })
                    });
                    return seq;

                } else {
                    if (isArray(tasks)) {
                        let seq = Observable.of(null);
                        tasks.forEach(task => {
                            seq = seq.flatMap(data => {
                                return this.runTask(task, data, ...providers);
                            })
                        });
                        return seq;
                    } else {
                        return this.runTask(tasks, undefined, ...providers);
                    }
                }
            });

        obs.subscribe(
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
        return obs;
    }

    protected runTask(task: IConfigure | Token<any>, data?: any, ...providers: Providers[]): Observable<any> {
        if (isToken(task)) {
            if (!this.container.has(task)) {
                if (isClass(task) && this.isTask(task)) {
                    this.container.register(task);
                } else {
                    return Observable.throw(`${typeof task} is not vaild task type.`);
                }
            }
            let instance = this.container.resolve(task, ...providers);
            if (isFunction(instance.run)) {
                return instance.run(data);
            } else if (instance.config && isClass(instance.config.task) && this.isTask(instance.config.task)) {
                let cfg = instance.config as IConfigure;
                return this.runByConfig(cfg, data);
            } else {
                return Observable.throw(`${JSON.stringify(instance)} is not vaild task instance.`);
            }

        } else {
            return this.runByConfig(task, data);
        }
    }

    protected runByConfig<T, TResult>(cfg: IConfigure, data?: any): Observable<TResult> {
        return Observable.fromPromise(this.container.resolve<IBuilder>(cfg.builder || taskSymbols.IBuilder)
            .build(cfg), this.getScheduler())
            .flatMap(task => {
                return task.run(data);
            });
    }

    protected loadModules(container: IContainer): Observable<Type<any>[][]> {
        if (this.useModules.length) {
            let builder = container.get<IContainerBuilder>(symbols.IContainerBuilder);
            return Observable.forkJoin(this.useModules.map(option => {
                return Observable.fromPromise(builder.loadModule(container, option), this.getScheduler());
            }));
        } else {
            return Observable.of<Type<any>[][]>([], this.getScheduler());
        }
    }

    protected registerExt(container: IContainer) {
        container.register(this.log || TaskLogAspect);
        container.registerSingleton(taskSymbols.TaskContainer, this);
        registerTaskCoreDecorators(container);
        registerTaskModules(container);
    }

    protected isTask(task: Type<ITask>): boolean {
        return hasOwnClassMetadata(Task, task) || hasOwnClassMetadata(TaskModule, task);
    }
}

