import { ITask } from './ITask';
import { Token, Type, AppConfiguration } from '@ts-ioc/core';
import { RunWay } from './RunWay';

/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IConfigure extends AppConfiguration<ITask> {

    /**
    * context tasks name.
    *
    * @type {string}
    * @memberof IContext
    */
   name?: string;

   /**
    * root dir.
    *
    * @type {string}
    * @memberof IConfigure
    */
   rootdir?: string;

   /**
    * run way.
    *
    * @type {RunWay}
    * @memberof IContext
    */
   runWay?: RunWay;

    /**
     * task module.
     *
     * @type {Token<ITask>}
     * @memberof IConfigure
     */
    task?: Token<ITask>;
    /**
     * children
     *
     * @type {((IConfigure | Type<ITask>)[])}
     * @memberof IConfigure
     */
    children?: (IConfigure | Type<ITask>)[];
}
