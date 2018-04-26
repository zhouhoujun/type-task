import { DefaultTaskContainer, ITaskContainer, BootstrapTask } from '@taskp/core';
import { AsyncLoadOptions, Type, IContainer, Providers } from '@ts-ioc/core';
import { TaskLogAspect } from './aop/index';


export class TaskContainer extends DefaultTaskContainer {

    constructor(rootPath: string, container?: IContainer) {
        super(rootPath, container);
    }

    /**
     * create task container.
     *
     * @static
     * @param {string} root
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {ITaskContainer}
     * @memberof TaskContainer
     */
    static create(root: string, ...modules: (Type<any> | AsyncLoadOptions)[]): ITaskContainer {
        let taskContainer = new TaskContainer(root);
        if (modules) {
            taskContainer.use(...modules);
        }
        return taskContainer;
    }

    /**
     * bootstrap task.
     *
     * @param {BootstrapTask} [tasks]
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof DefaultTaskContainer
     */
    bootstrap(tasks?: BootstrapTask, ...providers: Providers[]): Promise<any> {
        let end: Date;
        let start = new Date();

        console.log('[' + start.toString() + ']', 'Starting', '...');

        return super.bootstrap(tasks, ...providers)
            .then(
                data => {
                    end = new Date();
                    console.log('[' + end.toString() + ']', 'Finished', ' after ', end.getTime() - start.getTime());
                    return data;
                },
                err => {
                    end = new Date();
                    console.log('[' + end.toString() + ']', 'Finished', 'errored after', end.getTime() - start.getTime());
                    console.error(err);
                    return err;
                });
    }

    protected registerExt(container: IContainer) {
        super.registerExt(container);
        container.register(this.log || TaskLogAspect);
    }
}
