import { isString, isObject, createClassDecorator, MetadataExtends, MetadataAdapter, isClass, ITypeDecorator, Token, Registration, isToken, isSymbol, InjectToken } from '@ts-ioc/core';
import { TaskMetadata } from '../metadatas';
import { ActivityToken, IActivity } from '../IActivity';
import { TaskBuilderToken, ITaskBuilder } from '../ITaskBuilder';


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
     * @param {T} [taskName] task name.
     * @param {(Registration<any> | symbol | string)} provide define this class provider for provide.
     * @param {string} [alias] define this class provider with alias for provide.
     * @param {boolean} [singlton] define this class as singlton.
     */
    (metadata?: T): ClassDecorator;

    /**
     * task decorator, use to define class as task element.
     *
     * @Task
     * @param {string} [provide] task name or provide.
     * @param {string} [provide] task alias name.
     */
    (provide?: Registration<any> | symbol | string, alias?: string): ClassDecorator;
    /**
     * task decorator, use to define class as task element.
     *
     * @Task
     */
    (target: Function): void;
}

export function createTaskDecorator<T extends TaskMetadata>(
    taskType: string,
    builder: Token<ITaskBuilder> | ITaskBuilder,
    provideType: InjectToken<IActivity>,
    adapter?: MetadataAdapter,
    metadataExtends?: MetadataExtends<T>): ITaskDecorator<T> {

    return createClassDecorator<TaskMetadata>('Task',
        args => {
            if (adapter) {
                adapter(args);
            }
            args.next<TaskMetadata>({
                match: (arg) => arg && (isString(arg) || (isObject(arg) && arg instanceof Registration)),
                setMetadata: (metadata, arg) => {
                    if (isString(arg)) {
                        metadata.name = arg;
                    } else {
                        metadata.provide = arg;
                        if (arg instanceof Registration) {
                            metadata.name = arg.getDesc();
                        }
                    }
                }
            });

            args.next<TaskMetadata>({
                match: (arg) => arg && isString(arg),
                setMetadata: (metadata, arg) => {
                    metadata.name = arg;
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

            metadata.provide = metadata.provide || provideType;
            metadata.alias = metadata.alias || metadata.name;

            metadata.taskType = taskType;
            if (!metadata.builder) {
                metadata.builder = builder;
            }
            return metadata;
        }) as ITaskDecorator<T>;
}

/**
 * task decorator, use to define class is a task element.
 *
 * @Task
 */
export const Task: ITaskDecorator<TaskMetadata> = createTaskDecorator('Task', TaskBuilderToken, ActivityToken);

