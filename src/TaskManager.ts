import { Token, IContainer, ContainerBuilder, symbols, AsyncLoadOptions } from 'tsioc';
import { Src } from './utils/index';



export class TaskManager {

    container: IContainer;
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

    }
}

