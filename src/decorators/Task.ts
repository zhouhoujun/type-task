import { createClassDecorator, IClassDecorator, ClassMetadata, MetadataExtends, MetadataAdapter, isClassMetadata, Registration, isClass } from 'tsioc';
import { isString, isRegExp, isArray, isNumber } from 'util';
import { IOperate } from '../IOperate';
import { Src } from '../types';
import { Operation } from '../index';

export interface TaskMetadata extends IOperate, ClassMetadata {
    /**
     * type type.
     *
     * @type {string}
     * @memberof TaskMetadata
     */
    taskType?: string;
    /**
     * assert tasks. assert group name or extends name.
     *
     * @type {Src}
     * @memberof ITaskInfo
     */
    group?: Src;

}
export interface ITaskDecorator<T extends TaskMetadata> extends IClassDecorator<T> {
    (oper?: Operation, taskName?: string, group?: Src, provide?: Registration<any> | string, alias?: string): ClassDecorator;
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
                match: (arg) => isNumber(arg),
                setMetadata: (metadata, arg) => {
                    metadata.oper = arg;
                }
            });
            args.next<TaskMetadata>({
                match: (arg) => isString(arg),
                setMetadata: (metadata, arg) => {
                    metadata.name = name;
                }
            });
            args.next<TaskMetadata>({
                match: (arg) => isString(arg) || isArray(arg),
                setMetadata: (metadata, arg) => {
                    metadata.group = arg;
                }
            });
            args.next<TaskMetadata>({
                match: (arg) => isString(arg) || isArray(arg),
                setMetadata: (metadata, arg) => {
                    metadata.group = arg;
                }
            });
        },
        metadata => {
            if (metadataExtends) {
                metadata = metadataExtends(metadata as T);
            }

            if (!metadata.name && isClass(metadata.type)) {
                metadata.name = metadata.type.name;
            }
            metadata.taskType = taskType;
            metadata.singleton = true;
            return metadata;
        }) as ITaskDecorator<T>;
}

export const Task: ITaskDecorator<TaskMetadata> = createTaskDecorator('Task');

