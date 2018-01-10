import { createTaskDecorator, ITaskDecorator } from './Task';
import { TaskMetadata } from '../metadatas/index';

/**
 * pipe task metadata.
 *
 * @export
 * @interface PipeTaskMetadata
 * @extends {TaskMetadata}
 */
export interface PipeTaskMetadata extends TaskMetadata {

}

/**
 * pipe task.
 */
export const PipeTask: ITaskDecorator<PipeTaskMetadata> = createTaskDecorator<PipeTaskMetadata>('PipeTask');
