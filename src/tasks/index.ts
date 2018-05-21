import { IContainer, LifeScope, CoreActions, DecoratorType, IContainerBuilder } from '@ts-ioc/core';
import * as shells from './shells/index';
import * as pipes from './pipes/index';

export * from './shells/index';
export * from './pipes/index';

/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
export function registerTaskModules(container: IContainer) {
    container.use(shells, pipes);
}
