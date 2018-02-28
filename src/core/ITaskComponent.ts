import { ITask } from './ITask';
import { GComponent, Token, ComponentLifecycle, AsyncLoadOptions, Type, Provider, Providers } from 'tsioc';
import { RunWay } from './RunWay';
import { ITaskModule } from './ITaskModule';

/**
 * Task Component.
 *
 * @export
 * @interface ITaskComponent
 * @extends {GComponent<TaskComponent>}
 */
export interface ITaskComponent extends GComponent<ITaskComponent>, ITaskModule, ComponentLifecycle {

    /**
     * children run way.
     *
     * @type {RunWay}
     * @memberof ITaskComponent
     */
    runWay: RunWay;

    /**
     * use modules
     *
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {this}
     * @memberof ITaskComponent
     */
    use(...modules: (Type<any> | AsyncLoadOptions)[]): this;
}
