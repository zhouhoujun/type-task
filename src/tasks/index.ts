import { IContainer, symbols, LifeScope, CoreActions, DecoratorType, IContainerBuilder } from 'tsioc';
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
    let builder = container.get<IContainerBuilder>(symbols.IContainerBuilder);
    builder.snycLoadModule(container, { modules: [shells, pipes] });
}
