import { AsyncLoadOptions } from 'tsioc';
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
}
