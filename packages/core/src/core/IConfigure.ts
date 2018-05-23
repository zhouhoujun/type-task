import { ITask } from './ITask';
import { ITaskOption } from './ITaskOption';
import { Token, ModuleConfiguration, Type } from '@ts-ioc/core';
import { IBuilder } from './IBuilder';

/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IConfigure extends ModuleConfiguration {

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
