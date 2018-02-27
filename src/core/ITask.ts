import { IContext } from './IContext';
import { ComponentLifecycle } from 'tsioc';
import { IEnvironment } from '../IEnvironment';



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
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof ITask
     */
    run(data?: any): Promise<any>;

}

