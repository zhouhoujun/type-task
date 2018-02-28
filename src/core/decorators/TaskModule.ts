import { createClassDecorator, IClassDecorator, ClassMetadata, MetadataExtends, MetadataAdapter, isClassMetadata, Registration, isClass } from 'tsioc';
import { IContext } from '../IContext';

/**
 * pipe task metadata.
 *
 * @export
 * @interface TaskModuleMetadata
 * @extends {TaskMetadata}
 */
export interface TaskModuleMetadata extends ClassMetadata, IContext {

}

/**
 * pipe task.
 */
export const TaskModule: IClassDecorator<TaskModuleMetadata> = createClassDecorator<TaskModuleMetadata>('TaskModule');
