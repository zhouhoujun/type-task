import { createTaskDecorator, IActivityMetadata, ITaskDecorator, CoreActivityConfigure } from '@taskfr/core';
import { IPipeConfigure } from '../core/IPipeConfigure';
import { PipeActivityToken, PipeActivityBuilderToken } from '../core/IPipeActivity';

export interface IPipeTaskMetadata extends IActivityMetadata, IPipeConfigure {

}

export type PipeTaskMetadata = IPipeTaskMetadata & CoreActivityConfigure;

/**
 * pipe task decorator, use to define class is a pipe task element.
 *
 * @PipeTask
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask',  PipeActivityBuilderToken,  PipeActivityToken);
