import { createTaskDecorator, TaskMetadata, ITaskDecorator } from '@taskp/core';
import { IPipeConfigure, IPipeSourceConfigure, IPipeDestConfigure } from '../core/IPipeConfigure';

export interface PipeTaskMetadata extends TaskMetadata, IPipeConfigure, IPipeSourceConfigure, IPipeDestConfigure {

}

/**
 * pipe task decorator, use to define class is a pipe task element.
 *
 * @PipeTask
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask');
