import { createTaskDecorator, ITaskDecorator } from './Task';
import { TaskMetadata } from '../metadatas/index';

export interface PipeTaskMetadata extends TaskMetadata {

}

export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask');
