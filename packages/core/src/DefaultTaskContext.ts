import { Inject, IContainer, IContainerBuilder, Singleton } from '@ts-ioc/core';
import { taskSymbols } from './utils/index';
import { ITaskContainer } from './ITaskContainer';

/**
 * default task context.
 * 
 * @export
 * @class DefaultTaskContext
 */
export class DefaultTaskContext {
    @Inject(taskSymbols.TaskContainer)
    public taskContainer: ITaskContainer;

    constructor() {

    }

    get container(): IContainer {
        return this.taskContainer.container;
    }

    get containerBuilder(): IContainerBuilder {
        return this.taskContainer.containerBuilder;
    }

    getRunTasks(): string[] {
        return [];
    }
}