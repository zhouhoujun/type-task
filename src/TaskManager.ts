import { Token, IContainer, ContainerBuilder, symbols, AsyncLoadOptions } from 'tsioc';
import { Src } from './utils/index';
import { ITask } from './core/index';


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
    container: IContainer;
    /**
     * container builder
     *
     * @type {ContainerBuilder}
     * @memberof TaskManager
     */
    builder: ContainerBuilder;

    constructor(private root: string, container?: IContainer) {

        if (!container) {
            this.builder = new ContainerBuilder();
            this.container = this.builder.create();
        } else {
            this.container = container;
            this.builder = container.get<ContainerBuilder>(symbols.IContainerBuilder);
        }
    }

    loadTask(options: AsyncLoadOptions) {
        this.builder.loadModule(this.container, options)
    }

    run(task: Token<any>) {
        return this.container.resolve<ITask>(task).run();
    }

    // run(taskname?: string): Promise<any> {
    //     if (taskname) {
    //         return this.find(task => task.name === taskname).run();
    //     } else {
    //         this.each(task => {
    //             task.run()
    //         })
    //         return null;
    //     }
    // }
}

