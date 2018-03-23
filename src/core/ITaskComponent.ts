import { ITask } from './ITask';
import { GComponent, Token, ComponentLifecycle, AsyncLoadOptions, Type, Provider, Providers } from 'tsioc';
import { RunWay } from './RunWay';
import { ITaskModule } from './ITaskModule';
import { IConfigure } from '.';
import { Observable } from 'rxjs/Observable';
import { IScheduler } from 'rxjs/Scheduler';

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
     * get component config.
     *
     * @returns {IConfigure}
     * @memberof ITaskComponent
     */
    getConfig(): IConfigure;

    /**
     * get scheduler.
     *
     * @returns {IScheduler}
     * @memberof ITaskComponent
     */
    getScheduler(): IScheduler;

    /**
     * use modules
     *
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {this}
     * @memberof ITaskComponent
     */
    use(...modules: (Type<any> | AsyncLoadOptions)[]): this;

    /**
     * execute current component node task
     *
     * @param {*} data
     * @returns {(Promise<any> | Observable<any>)}
     * @memberof ITaskComponent
     */
    execute(data: any): Promise<any> | Observable<any>;
}
