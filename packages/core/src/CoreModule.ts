import { IContainer, LifeScope, CoreActions, DecoratorType, IContainerBuilder, LifeState, IocState, Inject, ContainerToken, IocExt } from '@ts-ioc/core';
import { TaskBuilder, TaskRunner, Task, TaskModule, TaskElement } from './core/index';
import { InitTaskAction } from './core/actions/InitTaskAction';
import { InitTaskModuleAction } from './core/actions/InitTaskModuleAction';


/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
@IocExt('setup')
export class CoreModule {
    constructor(@Inject(ContainerToken) private container: IContainer) {
    }

    setup() {
        let container = this.container;
        let lifeScope = container.getLifeScope();
        lifeScope.addAction(new InitTaskAction(), IocState.runtime, LifeState.afterConstructor);
        lifeScope.addAction(new InitTaskModuleAction(), IocState.runtime, LifeState.afterConstructor);
        lifeScope.registerDecorator(Task, CoreActions.bindProvider, 'InitTaskAction', CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        lifeScope.registerDecorator(TaskModule, CoreActions.bindProvider, 'InitTaskModuleAction', CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        container.register(TaskElement);
        container.register(TaskBuilder);
        container.register(TaskRunner);
    }
}
