import { createTaskDecorator, TaskMetadata, ITaskDecorator, TaskBuilderToken } from '@taskfr/core';
import { IPipeConfigure } from '../core/IPipeConfigure';
import { Registration } from '@ts-ioc/core';
import { PipeToken } from '../core/IPipeTask';

export interface PipeTaskMetadata extends TaskMetadata, IPipeConfigure {

}

/**
 * pipe task decorator, use to define class is a pipe task element.
 *
 * @PipeTask
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask', new Registration(TaskBuilderToken, 'pipe'), PipeToken);
