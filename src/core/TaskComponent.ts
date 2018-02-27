import { GComponent, GComposite, AsyncLoadOptions, IContainer, Type, symbols, IContainerBuilder, Inject, Mode, Provider, Providers, hasOwnClassMetadata, isClass, Abstract } from 'tsioc';
import { ITaskComponent } from './ITaskComponent';
import { Environment } from './Environment';
import { IContext } from './IContext';
import { ITask } from './ITask';
import { Task } from './decorators/index';
import { RunWay } from './RunWay';
import { Defer, taskSymbols } from '../utils/index';
import { IBuilder } from './IBuilder';

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

    /**
     * task run enviroment.
     */
    @Inject()
    enviroment: Environment;

    constructor(name: string, public runWay = RunWay.seqFirst) {
        super(name);
        this.useModules = [];
    }


    use(...modules: (Type<any> | AsyncLoadOptions)[]): this {
        this.useModules.push(...modules.map(itm => isClass(itm) ? { modules: [itm] } : itm));
        return this;
    }

    run(data?: any): Promise<any> {
        return this.loadModules(this.enviroment.container)
            .then((container) => {
                this.build(this.registerModules);
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
                        execPromise = execPromise.then((data) => {
                            return task.run(data);
                        });
                    }, Mode.children);
                } else if (this.runWay & RunWay.parallel) {
                    execPromise = execPromise.then(pdata => {
                        return Promise.all(this.children.map(task => task.run(pdata || data)));
                    });
                }

                if (this.runWay & RunWay.nodeLast) {
                    execPromise = execPromise.then(data => {
                        return this.execute(data);
                    });
                }

                return execPromise;
            });
    }

    build(types: Type<any>[]) {

    }

    loadModules(container: IContainer): Promise<IContainer> {
        if (this.useModules.length) {
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
        } else {
            return Promise.resolve(container);
        }
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
