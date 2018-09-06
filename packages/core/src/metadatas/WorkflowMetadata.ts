
import { CoreActivityConfigure, ActivityConfigure } from '../core/ActivityConfigure';

/**
 * workflow metadata.
 *
 * @export
 * @interface IWorkflowMetadata
 * @extends {ActivityConfigure}
 * @extends {ClassMetadata}
 */
export interface IWorkflowMetadata extends ActivityConfigure {

}

export type WorkflowMetadata = IWorkflowMetadata & CoreActivityConfigure;