import { WorkflowConfig } from '../IWorkflow';
import { CoreActivityConfigure } from '../ActivityConfigure';
import { ClassMetadata } from '@ts-ioc/core';

export interface IWorkflowMetadata extends ClassMetadata, WorkflowConfig {

}

export type WorkflowMetadata = IWorkflowMetadata & CoreActivityConfigure;
