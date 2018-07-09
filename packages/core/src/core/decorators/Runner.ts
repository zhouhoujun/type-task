import { createClassDecorator, InjectableMetadata, IInjectableDecorator } from '@ts-ioc/core';

/**
 * runner decorator, define for class.  use to define the class. it can setting provider to some token, singleton or not.
 *
 * @Injectable
 */
export const Runner: IInjectableDecorator = createClassDecorator<InjectableMetadata>('Runner');
