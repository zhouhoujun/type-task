import { IContainer, CoreActions, IocModule, Inject, ContainerToken } from '@ts-ioc/core';
import { PipeTask, AssetTask, Package } from './decorators';
import * as tasks from './tasks';
import * as cores from './core';
import * as assets from './assets';

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
        lifeScope.registerDecorator(PipeTask, CoreActions.bindProvider, CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        lifeScope.registerDecorator(AssetTask, CoreActions.bindProvider, CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        lifeScope.registerDecorator(Package, CoreActions.bindProvider, CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        this.container.use(cores, assets, tasks);
    }
}
