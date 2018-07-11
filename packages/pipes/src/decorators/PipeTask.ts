import { createTaskDecorator, TaskMetadata, ITaskDecorator } from '@taskfr/core';
import { IPipeConfigure } from '../core/IPipeConfigure';
import { PipeActivityToken } from '../core/IPipeActivity';
import { PipeActivityBuilderToken } from '../core/PipeActivityBuilder';

export interface PipeTaskMetadata extends TaskMetadata, IPipeConfigure {

}

/**
 * pipe task decorator, use to define class is a pipe task element.
 *
 * @PipeTask
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask', PipeActivityBuilderToken, PipeActivityToken);
