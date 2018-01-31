import { GComponent, GComposite, AsyncLoadOptions, IContainer, Type, symbols, IContainerBuilder, Inject, Mode } from 'tsioc';
import { TaskComponent } from './TaskComponent';
import { ITaskContext } from './ITaskContext';

/**
 * task composite.
 *
 * @export
 * @class TaskComposite
 * @extends {GComposite<TaskComponent>}
 * @implements {TaskComponent}
 */
export class TaskComposite extends GComposite<TaskComponent> implements TaskComponent {

    @Inject(symbols.IContainer)
    protected container: IContainer;

    protected registerModules: Type<any>[];
    protected useModules: AsyncLoadOptions[];
    constructor(taskName: string) {
        super(taskName)
        this.useModules = [];
    }


    use(modules: AsyncLoadOptions): this {
        this.useModules.push(modules);
        return this;
    }

    getContext(): ITaskContext {
        return null;
    }

    run(taskname?: string): Promise<any> {
        return this.loadModules(this.container)
            .then(() => {
                if (taskname) {
                    return this.find(task => task.name === taskname).run();
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


    protected execute(): Promise<any> {
        return Promise.resolve();
    }
}
