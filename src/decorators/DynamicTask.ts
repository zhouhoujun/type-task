import { TaskMetadata, createTaskDecorator, ITaskDecorator } from './Task';

export interface DynamicTaskMetadata extends TaskMetadata {

}

export const DynamicTask: ITaskDecorator<DynamicTaskMetadata> = createTaskDecorator<DynamicTaskMetadata>('DynamicTask');
