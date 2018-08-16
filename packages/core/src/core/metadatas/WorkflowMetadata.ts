
import { CoreActivityConfigure, ActivityConfigure } from '../ActivityConfigure';
import { ClassMetadata } from '@ts-ioc/core';

export interface IWorkflowMetadata extends ActivityConfigure, ClassMetadata {

}

export type WorkflowMetadata = IWorkflowMetadata & CoreActivityConfigure;
