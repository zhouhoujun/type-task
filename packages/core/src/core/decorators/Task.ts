import { isString, isObject, createClassDecorator, MetadataExtends, MetadataAdapter, isClass, ITypeDecorator, Token, Registration, isToken } from '@ts-ioc/core';
import { ActivityMetadata } from '../metadatas/ActivityMetadata';
import { IActivityBuilder, ActivityBuilderToken } from '../IActivityBuilder';
import { DefaultWorkflowBuilder } from '../../DefaultWorkflowBuilder';


/**
 * task decorator, use to define class is a task element.
 *
 * @export
 * @interface ITaskDecorator
 * @extends {ITypeDecorator<T>}
 * @template T
 */
export interface ITaskDecorator<T extends ActivityMetadata> extends ITypeDecorator<T> {
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
    (provide: Registration<any> | symbol | string, builder?: Token<IActivityBuilder>, alias?: string): ClassDecorator;

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
 * @param {(Token<IActivityBuilder> | IActivityBuilder)} builder
 * @param {InjectToken<IActivity>} provideType
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {ITaskDecorator<T>}
 */
export function createTaskDecorator<T extends ActivityMetadata>(
    taskType: string,
    annotationBuilder?: Token<IActivityBuilder> | IActivityBuilder,
    provideType?: Token<any>,
    adapter?: MetadataAdapter,
    metadataExtends?: MetadataExtends<T>): ITaskDecorator<T> {

    return createClassDecorator<ActivityMetadata>('Task',
        args => {
            if (adapter) {
                adapter(args);
            }
            args.next<ActivityMetadata>({
                match: (arg) => arg && (isString(arg) || (isObject(arg) && arg instanceof Registration)),
                setMetadata: (metadata, arg) => {
                    if (isString(arg)) {
                        metadata.name = arg;
                    }
                    metadata.provide = arg;
                }
            });

            args.next<ActivityMetadata>({
                match: (arg) => isString(arg) || isToken(arg),
                setMetadata: (metadata, arg) => {
                    if (isString(arg)) {
                        metadata.name = arg;
                    } else {
                        metadata.annotationBuilder = arg;
                    }
                }
            });

            args.next<ActivityMetadata>({
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

            if (!metadata.provide) {
                metadata.provide = metadata.name;
            }

            if (provideType) {
                metadata.provide = new Registration(provideType, metadata.provide.toString());
            }

            metadata.decorType = taskType;
            if (annotationBuilder && !metadata.annotationBuilder) {
                metadata.annotationBuilder = annotationBuilder;
            }

            return metadata;
        }) as ITaskDecorator<T>;
}

/**
 * task decorator, use to define class is a task element.
 *
 * @Task
 */
export const Task: ITaskDecorator<ActivityMetadata> = createTaskDecorator('Task', ActivityBuilderToken);

