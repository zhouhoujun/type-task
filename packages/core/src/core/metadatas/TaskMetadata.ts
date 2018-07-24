import { ClassMetadata } from '@ts-ioc/core';
import { CoreActivityConfigure } from '../IConfigure';

/**
 * task metadata.
 *
 * @export
 * @interface TaskMetadata
 * @extends {ClassMetadata}
 */
export interface TaskDecoMetadata extends ClassMetadata {
    decorType?: string;
}


export type TaskMetadata = (TaskDecoMetadata & CoreActivityConfigure);
