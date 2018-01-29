import { IContainer, symbols, LifeScope, CoreActions } from 'tsioc';
import { Task } from './decorators/index';


export * from './ITask';
export * from './TaskComponent';
export * from './TaskComposite';
export * from './TaskContext';

export * from './decorators/index';
export * from './metadatas/index';


export function registerTaskDecorators(container: IContainer) {
    let liefscope = container.resolve<LifeScope>(symbols.LifeScope);
    liefscope.registerDecorator(Task, CoreActions.bindProvider, CoreActions.componentBeforeInit, CoreActions.componentInit);
}
