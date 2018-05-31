import { IContainer, LifeScope, CoreActions, DecoratorType, IContainerBuilder, IocModule, Inject, ContainerToken } from '@ts-ioc/core';
import { PipeTask } from './core/index';
import * as shells from './shells/index';
import * as tasks from './task/index';

/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
@IocModule('setup')
export class PipeModule {
    constructor(@Inject(ContainerToken) private container: IContainer) {

    }

    setup() {
        let lifeScope = this.container.getLifeScope();
        lifeScope.registerDecorator(PipeTask, CoreActions.bindProvider, 'InitTaskAction', CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        this.container.use(cores, shells, tasks);
    }
}
