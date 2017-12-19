import { ClassMetadata } from 'tsioc';
import { Src } from '../../types';

export interface TaskMetadata extends ClassMetadata {
    /**
     * task name, default class name.
     *
     * @type {TaskString}
     * @memberof IOperate
     */
    name?: string;
    /**
     * task type.
     *
     * @type {string}
     * @memberof TaskMetadata
     */
    taskType?: string;
    /**
     * assert tasks. assert group name or extends name.
     *
     * @type {Src}
     * @memberof ITaskInfo
     */
    group?: Src;

}
