import { IContainer, symbols, LifeScope, CoreActions, DecoratorType, IContainerBuilder } from 'tsioc';
import { Task } from './decorators/index';
import { InitTaskAction } from './actions/InitTaskAction';
import { Environment } from './Environment';
import { TaskElement } from './TaskElement';

import * as tasks from './tasks/index';
import { Builder } from './Builder';

export * from './IBuilder';
export * from './Builder';
export * from './ITask';
export * from './AbstractTask';
export * from './IContext';
export * from './ITaskComponent';
export * from './TaskComponent';
export * from './TaskElement';

export * from './decorators/index';
export * from './metadatas/index';
export * from './tasks/index';

/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
export function registerTaskDecorators(container: IContainer) {
    let lifeScope = container.getLifeScope();
    lifeScope.addAction(new InitTaskAction(), DecoratorType.Class, CoreActions.afterConstructor);
    lifeScope.registerDecorator(Task, CoreActions.bindProvider, 'InitTaskAction', CoreActions.componentCache, CoreActions.componentBeforeInit, CoreActions.componentInit);

    container.register(Environment);
    container.register(TaskElement);
    container.register(Builder);
    let builder = container.get<IContainerBuilder>(symbols.IContainerBuilder);
    builder.snycLoadModule(container, { modules: [tasks] });
}
