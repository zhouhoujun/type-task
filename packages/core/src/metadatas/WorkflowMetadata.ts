
import { CoreActivityConfigs } from '../core/ActivityConfigure';

/**
 * workflow metadata.
 *
 * @export
 * @interface IWorkflowMetadata
 * @extends {ActivityConfigure}
 * @extends {ClassMetadata}
 */
export interface IWorkflowMetadata {

}

export type WorkflowMetadata = IWorkflowMetadata & CoreActivityConfigs;
