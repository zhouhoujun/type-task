import { Src, TaskResult } from './types';
import { ITaskContext } from './ITaskContext';
import { TaskMetadata } from './decorators';


/**
 * task interface.
 *
 * @export
 * @interface ITask
 */
export interface ITask {

    /**
     * execute task works.
     *
     * @param {ITaskContext} context
     * @returns {Promise<any>}
     *
     * @memberOf ITask
     */
    execute?(context: ITaskContext): Promise<any>;

}

