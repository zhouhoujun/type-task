import { ITask } from './ITask';
import { ITaskOption } from './ITaskOption';
import { Token, ModuleConfiguration, Type } from '@ts-ioc/core';
import { IBuilder } from './IBuilder';
import { RunWay } from './RunWay';

/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IConfigure extends ModuleConfiguration {

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

    /**
     * builder
     *
     * @type {IBuilder}
     * @memberof IContext
     */
    builder?: Token<IBuilder>;

    /**
     * children
     *
     * @type {((IConfigure | Type<ITask>)[])}
     * @memberof IConfigure
     */
    children?: (IConfigure | Type<ITask>)[];
}

/**
 * bootstrap task
 */
export type BootstrapTask = IConfigure | Token<any> | (Token<any> | IConfigure)[];
