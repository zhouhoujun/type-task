import { WorkflowConfig } from '../IWorkflow';
import { CoreActivityConfigure } from '../ActivityConfigure';
import { DIModuleMetadata } from '@ts-ioc/bootstrap';

export interface IWorkflowMetadata extends DIModuleMetadata, WorkflowConfig {

}

export type WorkflowMetadata = IWorkflowMetadata & CoreActivityConfigure;
