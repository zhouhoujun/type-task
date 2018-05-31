import { createTaskDecorator, TaskMetadata, ITaskDecorator } from '@taskp/core';

export interface PipeTaskMetadata extends TaskMetadata {

}

/**
 * pipe task decorator, use to define class is a pipe task element.
 *
 * @PipeTask
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask');
