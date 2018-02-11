import { GComponent, GComposite, AsyncLoadOptions, IContainer, Type, symbols, IContainerBuilder, Inject, Mode } from 'tsioc';
import { TaskComponent } from './TaskComponent';
import { Environment } from '../Environment';
import { IContext } from './IContext';

/**
 * task composite.
 *
 * @export
 * @class TaskComposite
 * @extends {GComposite<TaskComponent>}
 * @implements {TaskComponent}
 */
export abstract class TaskComposite extends GComposite<TaskComponent> implements TaskComponent {

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

    /**
     * filter task to run.
     *
     * @param {Type<any>[]} tasks
     * @returns {Type<any>[]}
     * @memberof TaskComposite
     */
    abstract filterTask(tasks: Type<any>[]): Type<any>[];


    /**
     * sort task run order.
     *
     * @param {Type<any>[]} tasks
     * @returns {Type<any>[]}
     * @memberof TaskComposite
     */
    abstract orderTask(tasks: Type<any>[]): Type<any>[];


    /**
     * get execution data.
     *
     * @param {Type<any>} task
     * @returns {*}
     * @memberof TaskComposite
     */
    abstract getExecData(task: Type<any>): any;

    /**
     * execute tasks
     *
     * @protected
     * @returns {Promise<any>}
     * @memberof TaskComposite
     */
    protected execute(): Promise<any> {
        let exec = Promise.resolve();
        this.orderTask(this.filterTask(this.registerModules))
            .forEach(task => {
                exec = exec.then(() => {
                    return this.enviroment.container.invoke<any>(task, 'run', { execData: this.getExecData(task) });
                });
            })
        return exec;
    }
}
