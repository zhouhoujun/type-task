import { ITaskComponent } from './ITaskComponent';
import { Token, InjectToken } from '@ts-ioc/core';
import { IConfigure } from './IConfigure';

/**
 * builder token.
 */
export const BuilderToken = new InjectToken<IBuilder>('__TASK_Builder');

/**
 * builder.
 *
 * @export
 * @interface IBuilder
 */
export interface IBuilder {

    /**
     * build task component.
     *
     * @param {IConfigure} config
     * @param {ITaskComponent} [root]
     * @returns {Promise<ITaskComponent>}
     * @memberof IBuilder
     */
    build(config: IConfigure, root?: ITaskComponent): Promise<ITaskComponent>;
}
