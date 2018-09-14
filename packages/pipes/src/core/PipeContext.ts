import { Singleton } from '@ts-ioc/core';
import { IPipeContext, PipeContextToken } from './IPipeContext';
import { NodeContext } from '@taskfr/node';

/**
 * pipe context.
 *
 * @export
 * @class PipeContext
 * @extends {Context}
 * @implements {IPipeContext}
 */
@Singleton(PipeContextToken)
export class PipeContext extends NodeContext implements IPipeContext {

}
