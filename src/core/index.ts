import { IContainer, symbols, LifeScope, CoreActions, DecoratorType } from 'tsioc';
import { Task } from './decorators/index';
import { InitTaskAction } from './actions/InitTaskAction';

export * from './ITask';
export * from './IContext';
export * from './TaskComponent';
export * from './TaskComposite';
export * from './TaskContext';
export * from './TaskElement';

export * from './decorators/index';
export * from './metadatas/index';

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
}
