import { Token, IContainer, IContainerBuilder, ContainerBuilder, symbols, AsyncLoadOptions, Type, Inject, Express, Mode, Providers, isClass, isToken, hasOwnClassMetadata } from 'tsioc';
import { taskSymbols } from './utils/index';
import { ITask, IBuilder, IContext, registerTaskDecorators, Task } from './core/index';
import { ITaskContainer } from './ITaskContainer';

/**
 * task container.
 *
 * @export
 * @class TaskManager
 */
export class TaskContainer implements ITaskContainer {

    container: IContainer;
    containerBuilder: IContainerBuilder;

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
     * bootstrap task.
     *
     * @param {(IContext | Token<ITask>)} task
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof TaskContainer
     */
    bootstrap(task: IContext | Token<ITask>, ...providers: Providers[]): Promise<any> {
        let builder = this.containerBuilder;
        return Promise.all(this.useModules.map(option => {
            return builder.loadModule(this.container, option);
        })).then((types) => {
            if (isToken(task)) {
                if (!this.container.has(task)) {
                    if (isClass(task) && hasOwnClassMetadata(Task, task)) {
                        this.container.register(task);
                    } else {
                        return Promise.reject(`${ typeof task } is not vaild task type.`);
                    }
                }
                return this.container.resolve(task, ...providers).run();
            } else {
                return this.container.resolve<IBuilder>(task.builder || taskSymbols.IBuilder)
                    .build(task)
                    .then(task => {
                        return task.run();
                    });
            }
        });
    }

    protected registerExt(container: IContainer) {
        container.registerSingleton(taskSymbols.TaskContainer, this);
        registerTaskDecorators(container);
    }
}

