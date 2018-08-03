import { isString, isObject, createClassDecorator, MetadataExtends, MetadataAdapter, isClass, ITypeDecorator, Token, Registration, isToken, InjectToken } from '@ts-ioc/core';
import { TaskMetadata } from '../metadatas';
import { ActivityToken, IActivity } from '../IActivity';
import { ActivityBuilderToken, IActivityModuleBuilder } from '../IActivityBuilder';
import { IBootBuilder } from '@ts-ioc/bootstrap';
import { ActivityBootBuilder } from '../ActivityBuilder';


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
     * @param {T} [metadata] task metadate configure.
     */
    (metadata?: T): ClassDecorator;

    /**
     * task decorator, use to define class as task element.
     *
     * @Task
     * @param {string} provide task name or provide.
     * @param {string} [alias] task alias name.
     */
    (provide: Registration<any> | symbol | string, alias?: string): ClassDecorator;

    /**
     * task decorator, use to define class as task element.
     *
     * @Task
     * @param {string} provide task name or provide.
     * @param {string} builder task builder token.
     * @param {string} [alias]  task alias name
     */
    (provide: Registration<any> | symbol | string, builder?: Token<ActivityBootBuilder>, alias?: string): ClassDecorator;

    /**
     * task decorator, use to define class as task element.
     *
     * @Task
     */
    (target: Function): void;
}

/**
 * create task decorator.
 *
 * @export
 * @template T
 * @param {string} taskType
 * @param {(Token<IActivityModuleBuilder> | IActivityModuleBuilder)} builder
 * @param {InjectToken<IActivity>} provideType
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {ITaskDecorator<T>}
 */
export function createTaskDecorator<T extends TaskMetadata>(
    taskType: string,
    builder?: Token<IActivityModuleBuilder> | IActivityModuleBuilder,
    moduleBuilder?: Token<IBootBuilder<any>> | IBootBuilder<any>,
    bootstrapBuilder?: Token<IBootBuilder<any>> | IBootBuilder<any>,
    provideType?: Token<IActivity>,
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
                    }
                }
            });

            args.next<TaskMetadata>({
                match: (arg) => isString(arg) || isToken(arg),
                setMetadata: (metadata, arg) => {
                    if (isString(arg)) {
                        metadata.name = arg;
                    } else {
                        metadata.moduleBuilder = arg;
                    }
                }
            });

            args.next<TaskMetadata>({
                match: (arg) => isString(arg),
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

            metadata.decorType = taskType;
            if (builder && !metadata.builder) {
                metadata.builder = builder;
            }
            if (moduleBuilder && !metadata.moduleBuilder) {
                metadata.moduleBuilder = moduleBuilder;
            }
            if (bootstrapBuilder && !metadata.bootstrapBuilder) {
                metadata.bootstrapBuilder = bootstrapBuilder;
            }
            return metadata;
        }) as ITaskDecorator<T>;
}

/**
 * task decorator, use to define class is a task element.
 *
 * @Task
 */
export const Task: ITaskDecorator<TaskMetadata> = createTaskDecorator('Task', ActivityBuilderToken, ActivityBootBuilder, ActivityBootBuilder, ActivityToken);

