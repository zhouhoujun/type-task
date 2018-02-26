import { ITask } from './ITask';
import { GComponent, Token, ComponentLifecycle, AsyncLoadOptions, Type, Provider, Providers } from 'tsioc';

/**
 * Task Component.
 *
 * @export
 * @interface TaskComponent
 * @extends {GComponent<TaskComponent>}
 */
export interface TaskComponent extends GComponent<TaskComponent>, ITask, ComponentLifecycle {

    /**
     * use modules
     *
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {this}
     * @memberof TaskComponent
     */
    use(...modules: (Type<any> | AsyncLoadOptions)[]): this;

    /**
     * run task
     *
     * @param {string} [name]
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    run(name?: string): Promise<any>;

    /**
     * get task provider.
     *
     * @param {Type<any>} type
     * @returns {Providers[]}
     * @memberof TaskComponent
     */
    getTaskProvider(type: Type<any>): Providers[];
}
