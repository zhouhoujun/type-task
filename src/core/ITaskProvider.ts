import { Providers, ObjectMap } from "tsioc";
import { RunWay } from "./RunWay";


/**
 * Task provider
 *
 * @export
 * @interface TaskProvider
 * @extends {ObjectMap<any>}
 */
export interface ITaskProvider extends ObjectMap<any> {
    /**
    * context tasks name.
    *
    * @type {string}
    * @memberof IContext
    */
    name?: string;

    /**
     * run way.
     *
     * @type {RunWay}
     * @memberof IContext
     */
    runWay?: RunWay;
}

export type TaskProvider = ITaskProvider | Providers;
