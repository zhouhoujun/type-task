import { ClassMetadata, IAnnotationMetadata } from '@ts-ioc/core';
import { CoreActivityConfigure } from '../ActivityConfigure';
import { IActivity } from '../IActivity';

/**
 * task metadata.
 *
 * @export
 * @interface TaskMetadata
 * @extends {ClassMetadata}
 */
export interface IActivityMetadata extends IAnnotationMetadata<IActivity> {
    decorType?: string;
}

/**
 * activity metadata.
 */
export type ActivityMetadata = (IActivityMetadata & CoreActivityConfigure);
