import { createClassDecorator, IClassDecorator, ClassMetadata, MetadataExtends, MetadataAdapter, isClassMetadata, Registration, isClass, isArray } from '@ts-ioc/core';
import { IConfigure } from '../IConfigure';
import { createTaskDecorator } from './Task';

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
    createTaskDecorator<TaskModuleMetadata>('TaskModule',
        args => {
            args.next<TaskModuleMetadata>({
                match: (arg) => arg && (isClass(arg.task) || isArray(arg.children)),
                setMetadata: (metadata, arg) => {
                    metadata.config = arg;
                }
            });
        },
        metadata => {
            if (!metadata.name && isClass(metadata.type)) {
                let isuglify = /^[a-z]$/.test(metadata.type.name);
                if (isuglify && metadata.type.classAnnations) {
                    metadata.name = metadata.type.classAnnations.name;
                } else {
                    metadata.name = metadata.type.name;
                }
            }
            if (!metadata.provide) {
                metadata.provide = metadata.name;
            }
            return metadata;
        }) as ITaskClassDecorator<TaskModuleMetadata>;
