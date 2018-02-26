import { Token, IContainer, IContainerBuilder, ContainerBuilder, symbols, AsyncLoadOptions, Type, Inject, Express, Mode, Providers, isClass } from 'tsioc';
import { Src, taskSymbols } from './utils/index';
import { ITask, registerTaskDecorators } from './core/index';
import { ITaskContainer } from './ITaskContainer';

/**
 * task container.
 *
 * @export
 * @class TaskManager
 */
export class TaskContainer implements ITaskContainer {

    container: IContainer;

    protected useModules: AsyncLoadOptions[];

    constructor(public rootPath: string, container?: IContainer) {
        this.useModules = [];
        if (!container) {
            let builder = new ContainerBuilder();
            this.container = builder.create();
        } else {
            this.container = container;
        }

        this.registerExt(this.container);
    }

    static create(root: string, container?: IContainer, ...modules: AsyncLoadOptions[]): ITaskContainer {
        let taskContainer = new TaskContainer(root, container);
        if (modules) {
            taskContainer.use(...modules);
        }
        return taskContainer;
    }

    use(...modules: (Type<any> | AsyncLoadOptions)[]): this {
        this.useModules.push(...modules.map(itm => isClass(itm) ? { modules: [itm] } : itm));
        return this;
    }

    bootstrap(type: Token<ITask>, ...providers: Providers[]): Promise<any> {
        let builder = this.container.get<IContainerBuilder>(symbols.IContainerBuilder);
        return Promise.all(this.useModules.map(option => {
            return builder.loadModule(this.container, option);
        })).then((types) => {
            if (!this.container.has(type)) {
                if (isClass(type)) {
                    this.container.register(type);
                } else {
                    console.error(type, ' is not vaild task type.');
                }
            }
            return this.container.resolve(type, ...providers).run();
        });
    }

    protected registerExt(container: IContainer) {
        registerTaskDecorators(container);
        container.registerSingleton(taskSymbols.TaskContainer, this);
    }
}

