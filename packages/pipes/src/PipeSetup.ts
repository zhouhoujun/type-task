import { IContainer, CoreActions, Inject, ContainerToken, IocExt } from '@ts-ioc/core';
import { Package } from './decorators';


@IocExt('setup')
export class PipeSetup {
    constructor(@Inject(ContainerToken) private container: IContainer) {

    }
    setup() {
        let lifeScope = this.container.getLifeScope();
        lifeScope.registerDecorator(Package, CoreActions.bindProvider, CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
    }
}
