import { createTaskDecorator, TaskMetadata, ITaskDecorator } from '@taskp/core';
import { IPipeConfigure, ISourceConfigure, IDestConfigure } from '../core/IPipeConfigure';

export interface PipeTaskMetadata extends TaskMetadata, IPipeConfigure {

}

/**
 * pipe task decorator, use to define class is a pipe task element.
 *
 * @PipeTask
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask');
