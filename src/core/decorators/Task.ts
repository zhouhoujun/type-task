import { createClassDecorator, IClassDecorator, ClassMetadata, MetadataExtends, MetadataAdapter, isClassMetadata, Registration, isClass } from 'tsioc';
import { isString, isRegExp, isArray, isNumber } from 'util';
import { Src } from '../../utils/index';
import { TaskMetadata } from '../metadatas/index';



export interface ITaskDecorator<T extends TaskMetadata> extends IClassDecorator<T> {
    (taskName?: string, provide?: Registration<any> | string, alias?: string): ClassDecorator;
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

export const Task: ITaskDecorator<TaskMetadata> = createTaskDecorator('Task');

