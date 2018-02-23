import { AsyncLoadOptions, Type } from 'tsioc';
import { RunWay } from '../pipes';

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
     * filter task to run.
     *
     * @param {Type<any>[]} tasks
     * @returns {Type<any>[]}
     * @memberof TaskComponent
     */
    filter?(tasks: Type<any>[]): Type<any>[];


    /**
     * sort task run order.
     *
     * @param {Type<any>[]} tasks
     * @returns {Type<any>[]}
     * @memberof TaskComponent
     */
    sort?(tasks: Type<any>[]): Type<any>[];


    /**
     * get execution data.
     *
     * @param {Type<any>} task
     * @returns {*}
     * @memberof TaskComponent
     */
    getExecData?(task: Type<any>): any;
}
