import { GComponent, GComposite, AsyncLoadOptions, IContainer, Type, symbols, IContainerBuilder, Inject, Mode, Provider, Providers, hasOwnClassMetadata, isClass, Abstract } from 'tsioc';
import { ITaskComponent } from './ITaskComponent';
import { TaskContext } from './TaskContext';
import { IConfigure } from './IConfigure';
import { ITask } from './ITask';
import { Task, TaskModule } from './decorators/index';
import { RunWay } from './RunWay';
import { Defer, taskSymbols } from '../utils/index';
import { IBuilder } from './IBuilder';
import { ITaskOption } from './ITaskOption';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/timeout';
import { IScheduler } from 'rxjs/Scheduler';

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

    /**
     * task run enviroment.
     */
    @Inject()
    context: TaskContext;

    constructor(name: string, public runWay = RunWay.seqFirst, config?: IConfigure) {
        super(name);
        this.useModules = [];
        this.config = config;
    }

    getConfig(): IConfigure {
        return this.find(cmp => !!cmp.config, Mode.route).config;
    }

    getScheduler(): IScheduler {
        if (this.context.container.has(taskSymbols.IScheduler)) {
            return this.context.container.get<IScheduler>(taskSymbols.IScheduler) || undefined;
        }
        return undefined;
    }


    use(...modules: (Type<any> | AsyncLoadOptions)[]): this {
        this.useModules.push(...modules.map(itm => isClass(itm) ? { modules: [itm] } : itm));
        return this;
    }

    run(data?: any): Observable<any> {
        return this.loadModules(this.context.container)
            .flatMap((container) => {
                if (this.config) {
                    this.config.moduleTarget = this;
                    return Observable.fromPromise(this.build(this.config, this), this.getScheduler())
                        .map(() => {
                            return container;
                        });
                }
                return Observable.of(container);
            })
            .flatMap(() => {
                let obsExec = Observable.of(data);
                if (this.runWay & RunWay.nodeFirst) {
                    obsExec = obsExec.flatMap(data => this.execute(data));
                }

                if (this.runWay & RunWay.sequence) {
                    this.each(task => {
                        obsExec = obsExec.flatMap((data) => {
                            return task.run(data);
                        });
                    }, Mode.children);
                } else if (this.runWay & RunWay.parallel) {
                    obsExec = obsExec.flatMap(pdata => {
                        if (this.children.length) {
                            return Observable.forkJoin(this.children.map(task => task.run(pdata)))
                        }
                        return Observable.of(pdata);

                    });
                }

                if (this.runWay & RunWay.nodeLast) {
                    obsExec = obsExec.flatMap(data => {
                        return this.execute(data);
                    });
                }

                return obsExec;
            });
    }


    loadModules(container: IContainer): Observable<IContainer> {
        if (this.useModules.length) {
            let builder = container.get<IContainerBuilder>(symbols.IContainerBuilder);
            return Observable.forkJoin(this.useModules.map(option => {
                return Observable.fromPromise(builder.loadModule(container, option), this.getScheduler());
            })).map((types) => {
                this.registerModules = this.registerModules || [];
                types.forEach(tys => {
                    this.registerModules = this.registerModules.concat(tys);
                });
                this.useModules = [];

                return container;
            });
        } else {
            return Observable.of(container, this.getScheduler());
        }
    }


    protected build(config: ITaskOption<ITask>, root?: ITaskComponent): Promise<ITaskComponent> {
        return this.context.container.resolve<IBuilder>(this.config.builder || taskSymbols.IBuilder)
            .build(this.config, root);
    }

    protected runByConfig<T, TResult>(cfg: ITaskOption<ITask>, data?: T): Observable<TResult> {
        return Observable.fromPromise(this.build(cfg), this.getScheduler())
            .flatMap(task => {
                return task.run(data);
            });
    }

    /**
     * execute tasks
     *
     * @protected
     * @param {*} data
     * @returns {(Promise<any> | Observable<any>)}
     * @memberof TaskComponent
     */
    abstract execute(data: any): Promise<any> | Observable<any>;

    protected isTask(task: Type<ITask>): boolean {
        return hasOwnClassMetadata(Task, task) || hasOwnClassMetadata(TaskModule, task);
    }
}
