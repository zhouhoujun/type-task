import { ITask } from './ITask';
import { ITaskOption } from './ITaskOption';
import { Token, ModuleConfiguration, Type } from '@ts-ioc/core';
import { ITaskBuilder } from './IBuilder';
import { RunWay } from './RunWay';

/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IConfigure<T extends ITask> extends ModuleConfiguration<T> {

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
     * children
     *
     * @type {((IConfigure | Type<T>)[])}
     * @memberof IConfigure
     */
    children?: (IConfigure<T> | Type<T>)[];
}
