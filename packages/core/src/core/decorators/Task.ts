import { isString, isRegExp, isArray, isNumber, createClassDecorator, ClassMetadata, MetadataExtends, MetadataAdapter, isClassMetadata, Registration, isClass, ITypeDecorator } from '@ts-ioc/core';
import { Src } from '../../utils/index';
import { TaskMetadata } from '../metadatas/index';


/**
 * task decorator, use to define class is a task element.
 *
 * @export
 * @interface ITaskDecorator
 * @extends {ITypeDecorator<T>}
 * @template T
 */
export interface ITaskDecorator<T extends TaskMetadata> extends ITypeDecorator<T> {
    /**
     * task decorator, use to define class as task element.
     *
     * @Task
     *
     * @param {string} [taskName] task name.
     * @param {(Registration<any> | symbol | string)} provide define this class provider for provide.
     * @param {string} [alias] define this class provider with alias for provide.
     * @param {boolean} [singlton] define this class as singlton.
     */
    (taskName?: string, provide?: Registration<any> | symbol | string, alias?: string, singleton?: boolean): ClassDecorator;
    (target: Function): void;
}


export function createTaskDecorator<T extends TaskMetadata>(
    taskType: string,
    adapter?: MetadataAdapter,
    metadataExtends?: MetadataExtends<T>): ITaskDecorator<T> {

    return createClassDecorator<TaskMetadata>('Task',
        args => {
            if (adapter) {
                adapter(args);
            }
            args.next<TaskMetadata>({
                match: (arg) => isString(arg),
                setMetadata: (metadata, arg) => {
                    metadata.name = arg;
                    metadata.provide = arg;
                }
            });
        },
        metadata => {
            if (metadataExtends) {
                metadata = metadataExtends(metadata as T);
            }

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
            metadata.taskType = taskType;
            return metadata;
        }) as ITaskDecorator<T>;
}

/**
 * task decorator, use to define class is a task element.
 *
 * @Task
 */
export const Task: ITaskDecorator<TaskMetadata> = createTaskDecorator('Task');

