import { IContainer, symbols, LifeScope, CoreActions, DecoratorType, IContainerBuilder, IocModule, Inject } from '@ts-ioc/core';
import * as shells from './shells/index';
import * as cores from './core/index';
import { TaskSymbols } from '@taskp/core';
/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
@IocModule('setup')
export class PipeModule {
    constructor(@Inject(symbols.IContainer) private container: IContainer) {

    }

    setup() {
        this.container.use(cores, shells);
    }
}