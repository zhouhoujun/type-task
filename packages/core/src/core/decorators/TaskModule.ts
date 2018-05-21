import { createClassDecorator, IClassDecorator, ClassMetadata, MetadataExtends, MetadataAdapter, isClassMetadata, Registration, isClass, isArray, ITypeDecorator } from '@ts-ioc/core';
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
 * @extends {ITypeDecorator<T>}
 * @template T
 */
export interface ITaskClassDecorator<T extends TaskModuleMetadata> extends ITypeDecorator<T> {
    /**
     * task module.
     *
     * @TaskModule
     *
     * @param {IConfigure} config task module config.
     * @param {(Registration<any> | symbol | string)} provide define this class provider for provide.
     * @param {string} [alias] define this class provider with alias for provide.
     * @param {boolean} [singlton] define this class as singlton.
     * @param {number} [cache]  define class cahce expris when is not singlton.
     */
    (config: IConfigure, provide?: Registration<any> | symbol | string, alias?: string, singlton?: boolean, cache?: number): ClassDecorator;

    /**
     * task module.
     *
     * @TaskModule
     *
     * @param {T} [metadata] task module metadata.
     */
    (metadata?: T): ClassDecorator;
}

/**
 * task module.
 *
 * @TaskModule
 *
 */
export const TaskModule: ITaskClassDecorator<TaskModuleMetadata> =
    createClassDecorator<TaskModuleMetadata>('TaskModule',
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
