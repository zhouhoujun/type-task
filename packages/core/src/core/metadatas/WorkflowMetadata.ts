
import { CoreActivityConfigure, ActivityConfigure } from '../ActivityConfigure';
import { ClassMetadata } from '@ts-ioc/core';

/**
 * workflow metadata.
 *
 * @export
 * @interface IWorkflowMetadata
 * @extends {ActivityConfigure}
 * @extends {ClassMetadata}
 */
export interface IWorkflowMetadata extends ActivityConfigure, ClassMetadata {

}

export type WorkflowMetadata = IWorkflowMetadata & CoreActivityConfigure;
