import { createTaskDecorator, TaskDecoMetadata, ITaskDecorator, ActivityBootBuilder } from '@taskfr/core';
import { IPipeConfigure } from '../core/IPipeConfigure';
import { PipeActivityToken, PipeBootBuilderToken } from '../core/IPipeActivity';

export interface PipeTaskMetadata extends TaskDecoMetadata, IPipeConfigure {

}

/**
 * pipe task decorator, use to define class is a pipe task element.
 *
 * @PipeTask
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask', ActivityBootBuilder, PipeBootBuilderToken, PipeBootBuilderToken, PipeActivityToken);
