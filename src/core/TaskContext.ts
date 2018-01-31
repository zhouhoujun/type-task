import { ITaskContext } from './ITaskContext';
import { Inject, symbols, IContainer, Singleton } from 'tsioc';
import { taskSymbols } from '../index';

/**
 * task context.
 *
 * @export
 * @class TaskContext
 */

@Singleton(taskSymbols.ITaskContext)
export class TaskContext implements ITaskContext {

    @Inject(symbols.IContainer)
    container: IContainer;

    constructor() {

    }



}
