import { IConfigure } from './IConfigure';
import { Token, Providers, Type } from 'tsioc';
import { ITask } from './ITask';

/**
 * task runner.
 * 
 * @export
 * @interface ITaskRunner
 */
export interface ITaskRunner {
    /**
     * run task.
     * 
     * @param {(IConfigure | Token<any>)} task 
     * @param {*} [data] 
     * @param {...Providers[]} providers 
     * @returns {Promise<any>} 
     * @memberof ITaskRunner
     */
    runTask(task: IConfigure | Token<any>, data?: any, ...providers: Providers[]): Promise<any>;
    
    /**
     * run configure task 
     * 
     * @param {IConfigure} cfg 
     * @param {*} [data] 
     * @returns {Promise<any>} 
     * @memberof ITaskRunner
     */
    runByConfig(cfg: IConfigure, data?: any): Promise<any>;

    /**
     * is type task or not.
     * 
     * @param {Type<ITask>} task 
     * @returns {boolean} 
     * @memberof ITaskRunner
     */
    isTask(task: Type<ITask>): boolean;
} 