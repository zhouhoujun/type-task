import { AsyncLoadOptions, Type } from 'tsioc';
import { RunWay } from './RunWay';
import { IBuilder } from './IBuilder';

/**
 * context.
 *
 * @export
 * @interface IContext
 */
export interface IContext {

    /**
     * context tasks name.
     *
     * @type {string}
     * @memberof IContext
     */
    name: string;

    /**
     * run way.
     *
     * @type {RunWay}
     * @memberof IContext
     */
    runWay?: RunWay;

    /**
     * builder
     *
     * @type {IBuilder}
     * @memberof IContext
     */
    builder?: IBuilder;

    /**
     * load task modules.
     *
     * @type {AsyncLoadOptions}
     * @memberof ITaskContext
     */
    loader?: AsyncLoadOptions;

    /**
     * execute result data
     *
     * @type {*}
     * @memberof ITaskContext
     */
    execResult?: any;


    /**
     * get execution data.
     *
     * @param {Type<any>} task
     * @returns {*}
     * @memberof TaskComponent
     */
    getExecData?(task: Type<any>): any;

    /**
     * children
     *
     * @type {IContext[]}
     * @memberof IContext
     */
    children?: IContext[];
}
