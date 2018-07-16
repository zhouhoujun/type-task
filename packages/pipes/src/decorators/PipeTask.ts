import { createTaskDecorator, TaskMetadata, ITaskDecorator } from '@taskfr/core';
import { IPipeConfigure } from '../core/IPipeConfigure';
import { PipeActivityToken, PipeActivityBuilderToken } from '../core/IPipeActivity';

export interface PipeTaskMetadata extends TaskMetadata, IPipeConfigure {

}

/**
 * pipe task decorator, use to define class is a pipe task element.
 *
 * @PipeTask
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask', PipeActivityBuilderToken, PipeActivityToken);
