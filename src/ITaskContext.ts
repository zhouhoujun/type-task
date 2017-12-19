import { IAssets } from './IAssets';
import { ITask } from './ITask';
import { Src } from './types';
import { IComponent, Express, Mode } from 'tsioc';


/**
 * runtime task context.
 *
 * @export
 * @interface ITaskContext
 */
export interface ITaskContext extends IComponent {

    /**
     * get Assets
     *
     * @type {IAssets}@memberof ITaskContext
     */
    getAssets(): IAssets;


    /**
     * map context.
     *
     * @template T
     * @param {Express<ITaskContext, T>} express
     * @param {Mode} [mode]
     * @param {Express<ITaskContext, boolean>} [filter]
     * @returns {T[]}
     *
     * @memberof ITaskContext
     */
    map<T>(express: Express<ITaskContext, T>, mode?: Mode, filter?: Express<ITaskContext, boolean>): T[];

    /**
     * run task in this context.
     *
     * @returns {Promise<any>}
     *
     * @memberof IContext
     */
    run(): Promise<any>;

}
