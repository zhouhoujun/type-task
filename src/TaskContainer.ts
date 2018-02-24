import { Token, IContainer, ContainerBuilder, symbols, AsyncLoadOptions, Type, Inject, Express, Mode } from 'tsioc';
import { Src, taskSymbols } from './utils/index';
import { ITask, TaskComposite, registerTaskDecorators, TaskComponent, TaskElement } from './core/index';
import { ITaskContainer } from './ITaskContainer';
import { IEnvironment } from './IEnvironment';

/**
 * task container.
 *
 * @export
 * @class TaskManager
 */
export class TaskContainer implements ITaskContainer {

    container: IContainer;

    private _root: TaskComponent;
    get root(): TaskComponent {
        if (!this._root) {
            this._root = this.container.get(TaskElement);
        }
        return this._root;
    }

    get enviroment(): IEnvironment {
        return this.container.get<IEnvironment>(taskSymbols.IEnvironment)
    }

    constructor(public rootPath: string, public name = '', container?: IContainer) {

        if (!container) {
            let builder = new ContainerBuilder();
            this.container = builder.create();
        } else {
            this.container = container;
        }

        this.registerExt(this.container);
    }

    protected registerExt(container: IContainer) {
        registerTaskDecorators(container);
        container.registerSingleton(taskSymbols.TaskContainer, this);
    }


    use(modules: AsyncLoadOptions): this {
        this.root.use(modules);
        return this;
    }

    run(name?: string): Promise<any> {
        return this.root.run(name);
    }

    getTaskProvider(type: Type<any>): any[] {
        return this.root.getTaskProvider(type);
    }

    add(node: TaskComponent): this {
        this.root.add(node);
        return this;
    }
    remove(node: string | TaskComponent): this {
        this.root.remove(node);
        return this;
    }
    find<T extends TaskComponent>(express: TaskComponent | Express<T, boolean>, mode?: Mode): T {
        return this.root.find(express, mode) as T;
    }
    filter<T extends TaskComponent>(express: Express<T, boolean | void>, mode?: Mode): T[] {
        return this.root.filter(express, mode) as T[];
    }
    each<T extends TaskComponent>(express: Express<T, boolean | void>, mode?: Mode) {
        this.root.each(express, mode);
    }
    trans<T extends TaskComponent>(express: Express<T, boolean | void>) {
        this.root.trans(express);
    }
    transAfter<T extends TaskComponent>(express: Express<T, boolean | void>) {
        this.root.transAfter(express);
    }
    routeUp<T extends TaskComponent>(express: Express<T, boolean | void>) {
        this.root.routeUp(express);
    }
    equals(node: TaskComponent): boolean {
        return this.root.equals(node);
    }
    empty(): TaskComponent {
        return this.root.empty();
    }
    isEmpty(): boolean {
        return this.root.isEmpty();
    }
}

