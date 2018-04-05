import { IContainer, symbols, LifeScope, CoreActions, DecoratorType, IContainerBuilder } from 'tsioc';
import { Task, TaskModule } from './decorators/index';
import { InitTaskAction } from './actions/InitTaskAction';
import { TaskContext } from './TaskContext';
import { TaskElement } from './TaskElement';

import { Builder } from './Builder';
import { InitTaskModuleAction } from './actions/InitTaskModuleAction';
import { TaskRunner } from './TaskRunner';

export * from './IBuilder';
export * from './Builder';
export * from './ITask';
export * from './AbstractTask';
export * from './ITaskOption';
export * from './IConfigure';
export * from './ITaskProvider';

export * from './ITaskComponent';
export * from './TaskComponent';
export * from './TaskElement';

export * from './decorators/index';
export * from './metadatas/index';
export * from './RunWay';
export * from './ITaskRunner'
export * from './TaskRunner';

/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
export function registerTaskCoreDecorators(container: IContainer) {
    let lifeScope = container.getLifeScope();
    lifeScope.addAction(new InitTaskAction(), DecoratorType.Class, CoreActions.afterConstructor);
    lifeScope.addAction(new InitTaskModuleAction(), DecoratorType.Class, CoreActions.afterConstructor);
    lifeScope.registerDecorator(Task, CoreActions.bindProvider, 'InitTaskAction', CoreActions.componentCache, CoreActions.componentBeforeInit, CoreActions.componentInit);
    lifeScope.registerDecorator(TaskModule,  CoreActions.bindProvider, 'InitTaskModuleAction', CoreActions.componentCache, CoreActions.componentBeforeInit, CoreActions.componentInit)
    container.register(TaskContext);
    container.register(TaskElement);
    container.register(Builder);
    container.register(TaskRunner);
}
