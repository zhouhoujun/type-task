import { Token, IContainer, ContainerBuilder, symbols, AsyncLoadOptions, Type } from 'tsioc';
import { Src, taskSymbols } from './utils/index';
import { ITask, TaskComposite, registerTaskDecorators } from './core/index';

/**
 * task manager.
 *
 * @export
 * @class TaskManager
 */
export class TaskManager extends TaskComposite {

    constructor(private root: string, container?: IContainer) {
        super(root);

        if (!container) {
            let builder = new ContainerBuilder();
            this.container = builder.create();
        } else {
            this.container = container;
        }
    }

    private hasRegisterExt = false;
    getContainer() {
        if (!this.hasRegisterExt) {
            this.registerExt(this.container);
            this.hasRegisterExt = true;
        }
        return this.container;
    }

    run(task: Token<any>): Promise<any> {
        return this.loadModules(this.getContainer())
            .then(container => {
                return container.resolve<ITask>(task).run();
            });
    }

    protected registerExt(container: IContainer) {
        registerTaskDecorators(container);
        container.registerSingleton(taskSymbols.TaskManager, this);
    }
}

