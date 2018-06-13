import { IContainer, CoreActions, IocModule, Inject, ContainerToken } from '@ts-ioc/core';
import { PipeTask, AssetTask } from './decorators/index';
import * as tasks from './tasks/index';
import * as cores from './core/index';
import * as assets from './assets/index';

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
        lifeScope.registerDecorator(AssetTask, CoreActions.bindProvider, 'InitTaskAction', CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        this.container.use(cores, assets, tasks);
    }
}
