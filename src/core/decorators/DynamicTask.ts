import { TaskMetadata, createTaskDecorator, ITaskDecorator } from './Task';



export const DynamicTask: ITaskDecorator<DynamicTaskMetadata> = createTaskDecorator<DynamicTaskMetadata>('DynamicTask');
