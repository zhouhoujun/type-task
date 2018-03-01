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
    name?: string;
    context?: IContext;
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
    },
        metadata => {
            if (!metadata.name && isClass(metadata.type)) {
                metadata.name = metadata.type.classAnnations ? metadata.type.classAnnations.name : metadata.type.name;
            }
            if (!metadata.provide) {
                metadata.provide = metadata.name;
            }
            return metadata;
        }) as ITaskClassDecorator<TaskModuleMetadata>;
