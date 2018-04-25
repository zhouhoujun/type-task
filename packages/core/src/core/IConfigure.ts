import { ITask } from './ITask';
import { ITaskOption } from './ITaskOption';
import { Token } from '@ts-ioc/core';

/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IConfigure extends ITaskOption<ITask> {

}

/**
 * bootstrap task
 */
export type BootstrapTask = IConfigure | Token<any> | (Token<any> | IConfigure)[];