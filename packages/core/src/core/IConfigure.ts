import { ITask } from './ITask';
import { ITaskOption } from './ITaskOption';
import { Token, Type, AppConfiguration } from '@ts-ioc/core';
import { ITaskBuilder } from './IBuilder';
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
     * builder
     *
     * @type {IBuilder}
     * @memberof IContext
     */
    builder?: Token<ITaskBuilder>;
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
