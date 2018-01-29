import { Token, IContainer, ContainerBuilder, symbols, AsyncLoadOptions } from 'tsioc';
import { Src } from './utils/index';
import { ITask } from './core/index';
import { registerTaskDecorators } from './index';


/**
 * task manager.
 *
 * @export
 * @class TaskManager
 */
export class TaskManager {
    /**
     * container
     *
     * @type {IContainer}
     * @memberof TaskManager
     */
    private container: IContainer;
    /**
     * container builder
     *
     * @type {ContainerBuilder}
     * @memberof TaskManager
     */
    private builder: ContainerBuilder;

    constructor(private root: string, container?: IContainer) {

        if (!container) {
            this.builder = new ContainerBuilder();
            this.container = this.builder.create();
        } else {
            this.container = container;
            this.builder = container.get<ContainerBuilder>(symbols.IContainerBuilder);
        }
    }

    getContainer() {
        return this.container;
    }

    registerDefaults(container: IContainer) {
        registerTaskDecorators(container);
    }

    loadTask(options: AsyncLoadOptions) {
        this.builder.loadModule(this.container, options)
    }

    run(task: Token<any>) {
        return this.container.resolve<ITask>(task).run();
    }
}

