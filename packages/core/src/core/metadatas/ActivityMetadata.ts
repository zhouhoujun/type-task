import { ClassMetadata } from '@ts-ioc/core';
import { CoreActivityConfigure } from '../ActivityConfigure';

/**
 * task metadata.
 *
 * @export
 * @interface TaskMetadata
 * @extends {ClassMetadata}
 */
export interface IActivityMetadata extends ClassMetadata {
    decorType?: string;
}

/**
 * activity metadata.
 */
export type ActivityMetadata = (IActivityMetadata & CoreActivityConfigure);
