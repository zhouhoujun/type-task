import { GComposite, AsyncLoadOptions, IContainer, Type, IContainerBuilder, Inject, Mode, isClass, Abstract, ContainerBuilderToken, ModuleType } from '@ts-ioc/core';
import { ITaskComponent } from './ITaskComponent';
import { IConfigure } from './IConfigure';
import { ITask } from './ITask';
import { RunWay } from './RunWay';
import { IBuilder, BuilderToken } from './IBuilder';
import { ITaskOption } from './ITaskOption';
import { ITaskRunner, TaskRunnerToken } from './ITaskRunner';
import { ITaskContext, TaskContextToken } from '../ITaskContext';

/**
 * task component.
 *
 * @export
 * @class TaskComponent
 * @extends {GComposite<ITaskComponent>}
 * @implements {TaskComponent}
 */
@Abstract()
export abstract class TaskComponent<T extends ITaskComponent> extends GComposite<T> implements ITaskComponent {

    protected registerModules: Type<any>[];
    protected useModules: AsyncLoadOptions[];

    config?: IConfigure;

    private runner: ITaskRunner;

    /**
     * task run enviroment.
     */
    @Inject(TaskContextToken)
    context: ITaskContext;

    constructor(name: string, public runWay = RunWay.seqFirst, config?: IConfigure) {
        super(name);
        this.useModules = [];
        this.config = config;
    }

    getConfig(): IConfigure {
        return this.find(cmp => !!cmp.config, Mode.route).config;
    }

    getRunner(): ITaskRunner {
        return this.context.container.get(TaskRunnerToken);
    }

    use(...modules: (ModuleType | AsyncLoadOptions)[]): this {
        this.useModules.push(...modules.map(itm => isClass(itm) ? { modules: [itm] } : itm));
        return this;
    }

    run(data?: any): Promise<any> {
        return this.loadModules(this.context.container)
            .then((container) => {
                if (this.config) {
                    this.config.moduleTarget = this;
                    return this.build(this.config, this)
                        .then(() => container);
                }
                return container;
            })
            .then(() => {
                let execPromise: Promise<any>;
                if (this.runWay & RunWay.nodeFirst) {
                    execPromise = this.execute(data);
                } else {
                    execPromise = Promise.resolve(data);
                }

                if (this.runWay & RunWay.sequence) {
                    this.each(task => {
                        execPromise = execPromise.then(data => task.run(data));
                    }, Mode.children);
                } else if (this.runWay & RunWay.parallel) {
                    execPromise = execPromise.then(pdata => {
                        return Promise.all(this.children.map(task => task.run(pdata)));
                    });
                }

                if (this.runWay & RunWay.nodeLast) {
                    execPromise = execPromise.then(data => this.execute(data));
                }

                return execPromise;
            });
    }


    loadModules(container: IContainer): Promise<IContainer> {
        if (this.useModules.length) {
            let builder = container.get(ContainerBuilderToken);
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
        } else {
            return Promise.resolve(container);
        }
    }


    protected build(config: ITaskOption<ITask>, root?: ITaskComponent): Promise<ITaskComponent> {
        return this.context.container.resolve<IBuilder>(this.config.builder || BuilderToken)
            .build(this.config, root);
    }

    /**
     * execute tasks
     *
     * @protected
     * @param {*} data
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    protected abstract execute(data: any): Promise<any>;

}
