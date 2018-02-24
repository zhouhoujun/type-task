import { IContext } from './IContext';
import { ComponentLifecycle } from 'tsioc';
import { IEnvironment } from '../IEnvironment';
import { ExecData } from './ExecData';



/**
 * task interface.
 *
 * @export
 * @interface ITask
 */
export interface ITask extends ComponentLifecycle {

    /**
     * task name.
     *
     * @type {string}
     * @memberof ITask
     */
    name: string;

    /**
     * task enviroment.
     *
     * @type {IEnvironment}
     * @memberof ITask
     */
    enviroment: IEnvironment;

    /**
     * run task.
     *
     * @returns {Promise<any>}
     * @memberof ITask
     */
    run(): Promise<any>;

}

