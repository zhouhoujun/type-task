import { InjectContextToken } from '@taskfr/core';
import { INodeContext } from '@taskfr/node';

/**
 * task context token.
 */
export const PipeContextToken = new InjectContextToken<IPipeContext>('pipe');

/**
 * task context.
 *
 * @export
 * @interface IPipeContext
 */
export interface IPipeContext extends INodeContext {

}
