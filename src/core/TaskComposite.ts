import { GComponent, GComposite, AsyncLoadOptions, IContainer, Type, symbols, IContainerBuilder, Inject, Mode, Provider, Providers, hasOwnClassMetadata } from 'tsioc';
import { TaskComponent } from './TaskComponent';
import { Environment } from './Environment';
import { IContext } from './IContext';
import { ITask } from './ITask';
import { Task } from './decorators/index';

/**
 * task composite.
 *
 * @export
 * @class TaskComposite
 * @extends {GComposite<TaskComponent>}
 * @implements {TaskComponent}
 */
export class TaskComposite<T extends TaskComponent> extends GComposite<T> implements TaskComponent {

    protected registerModules: Type<any>[];
    protected useModules: AsyncLoadOptions[];

    /**
     * task run enviroment.
     */
    @Inject()
    enviroment: Environment;

    constructor(name: string) {
        super(name);
        this.useModules = [];
    }


    use(modules: AsyncLoadOptions): this {
        this.useModules.push(modules);
        return this;
    }

    run(name?: string): Promise<any> {
        return this.loadModules(this.enviroment.container)
            .then(() => {
                if (name) {
                    return this.find(task => task.name === name).run();
                } else {
                    let executePromise = this.execute();
                    this.each(task => {
                        executePromise = executePromise.then(() => {
                            return task.run()
                        });
                    }, Mode.children)
                    return executePromise;
                }
            });
    }

    loadModules(container: IContainer): Promise<IContainer> {
        if (this.useModules.length) {
            return Promise.resolve(container)
                .then(container => {
                    let builder = container.get<IContainerBuilder>(symbols.IContainerBuilder);
                    return Promise.all(this.useModules.map(option => {
                        return builder.loadModule(container, option);
                    })).then((types) => {
                        this.registerModules = this.registerModules || [];
                        types.forEach(tys => {
                            this.registerModules = this.registerModules.concat(tys);
                        });
                        this.useModules = [];

                        return container;
                    });
                });
        } else {
            return Promise.resolve(container);
        }
    }

    getTaskProvider(type: Type<any>): Providers[] {
        return [];
    }

    protected getRunTasks(): Type<any>[] {
        return this.registerModules.filter(ty => hasOwnClassMetadata(Task, ty));
    }

    /**
     * execute tasks
     *
     * @protected
     * @returns {Promise<any>}
     * @memberof TaskComposite
     */
    protected execute(): Promise<any> {
        let exec = Promise.resolve();

        this.getRunTasks()
            .forEach(task => {
                exec = exec.then(() => {
                    let providers = this.getTaskProvider(task);
                    let instance = this.enviroment.container.resolve<ITask>(task, ...providers);
                    return instance.run();
                });
            });

        return exec;
    }
}
