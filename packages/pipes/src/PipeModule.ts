import { IContainer, LifeScope, CoreActions, DecoratorType, IContainerBuilder, IocModule, Inject, ContainerToken } from '@ts-ioc/core';
import * as shells from './shells/index';
import * as cores from './core/index';
import * as tasks from './core/index';
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
        this.container.use(cores, shells, tasks);
    }
}
