import { createClassDecorator, IClassDecorator, ClassMetadata, MetadataExtends, MetadataAdapter, isClassMetadata, Registration, isClass } from 'tsioc';
import { IContext } from '../IContext';

/**
 * pipe task metadata.
 *
 * @export
 * @interface TaskModuleMetadata
 * @extends {TaskMetadata}
 */
export interface TaskModuleMetadata extends ClassMetadata {
    context?: IContext
}

export interface ITaskClassDecorator<T extends TaskModuleMetadata> extends IClassDecorator<T> {
    (context: IContext, provide?: Registration<any> | symbol | string, alias?: string, singlton?: boolean, cache?: number): ClassDecorator;
    (metadata?: T): ClassDecorator;
}

/**
 * pipe task.
 */
export const TaskModule: ITaskClassDecorator<TaskModuleMetadata> =
    createClassDecorator<TaskModuleMetadata>('TaskModule', args => {
        args.next<TaskModuleMetadata>({
            match: (arg) => arg.task && isClass(arg.task),
            setMetadata: (metadata, arg) => {
                metadata.context = arg;
            }
        });
    }) as ITaskClassDecorator<TaskModuleMetadata>;
