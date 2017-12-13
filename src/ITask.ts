import { IOperate } from './IOperate';
import { Src, TaskResult } from './types';
import { IAssertDist } from './IAssertDist';
import { ITaskContext } from './ITaskContext';
import { TaskMetadata } from './decorators/Task';



/**
 * task decorator data.
 *
 * @export
 * @interface ITaskInfo
 * @extends {ITaskDecorator}
 */
export interface ITaskInfo extends TaskMetadata {
    /**
     * finally task name.
     *
     * @type {Src}
     * @memberof ITaskInfo
     */
    taskName?: Src;

    /**
     * assert dist info.
     *
     * @type {IAssertDist}
     * @memberof ITaskInfo
     */
    assert?: IAssertDist
}

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
     * @param {Gulp} [gulp]
     * @returns {Promise<any>}
     *
     * @memberOf ITask
     */
    execute?(context: ITaskContext): Promise<any>;

}

