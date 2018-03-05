import { createClassDecorator, IClassDecorator, ClassMetadata, MetadataExtends, MetadataAdapter, isClassMetadata, Registration, isClass } from 'tsioc';
import { IConfigure } from '../IConfigure';

/**
 * pipe task metadata.
 *
 * @export
 * @interface TaskModuleMetadata
 * @extends {TaskMetadata}
 */
export interface TaskModuleMetadata extends ClassMetadata {
    name?: string;
    config?: IConfigure;
}

/**
 * task class decorator.
 *
 * @export
 * @interface ITaskClassDecorator
 * @extends {IClassDecorator<T>}
 * @template T
 */
export interface ITaskClassDecorator<T extends TaskModuleMetadata> extends IClassDecorator<T> {
    (config: IConfigure, provide?: Registration<any> | symbol | string, alias?: string, singlton?: boolean, cache?: number): ClassDecorator;
    (metadata?: T): ClassDecorator;
}

/**
 * pipe task.
 */
export const TaskModule: ITaskClassDecorator<TaskModuleMetadata> =
    createClassDecorator<TaskModuleMetadata>('TaskModule',
        args => {
            args.next<TaskModuleMetadata>({
                match: (arg) => arg && isClass(arg.task),
                setMetadata: (metadata, arg) => {
                    metadata.config = arg;
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
