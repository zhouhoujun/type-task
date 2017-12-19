import { TaskMetadata, createTaskDecorator, ITaskDecorator } from './Task';

export interface PipeTaskMetadata extends TaskMetadata {

}

export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask');
