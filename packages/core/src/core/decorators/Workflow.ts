import { Registration, Token, MetadataAdapter, MetadataExtends, isString, isObject, isToken } from '@ts-ioc/core';
import { WorkflowMetadata } from '../metadatas';
import { createDIModuleDecorator, IDIModuleDecorator, IModuleBuilder } from '@ts-ioc/bootstrap';
import { WorkflowBuilderToken } from '../../WorkflowBuilder';
import { ActivityBuilderToken, IActivityBuilder } from '../IActivityBuilder';

/**
 * workflow decorator.
 *
 * @export
 * @interface IWorkflowDecorator
 * @extends {ITypeDecorator<T>}
 * @template T
 */
export interface IWorkflowDecorator<T extends WorkflowMetadata> extends IDIModuleDecorator<T> {
    /**
     * task decorator, use to define class as task element.
     *
     * @Workflow
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

export function createWorkflowDecorator<T extends WorkflowMetadata>(
    name: string,
    builder?: Token<IModuleBuilder<any>> | IModuleBuilder<any>,
    typeBuilder?: Token<IActivityBuilder> | IActivityBuilder,
    adapter?: MetadataAdapter,
    metadataExtends?: MetadataExtends<T>): IWorkflowDecorator<T> {

    return createDIModuleDecorator(name, builder, typeBuilder, args => {
        if (adapter) {
            adapter(args);
        }
        args.next<WorkflowMetadata>({
            match: (arg) => arg && (isString(arg) || (isObject(arg) && arg instanceof Registration)),
            setMetadata: (metadata, arg) => {
                if (isString(arg)) {
                    metadata.name = arg;
                } else {
                    metadata.provide = arg;
                }
            }
        });

        args.next<WorkflowMetadata>({
            match: (arg) => isString(arg) || isToken(arg),
            setMetadata: (metadata, arg) => {
                if (isString(arg)) {
                    metadata.name = arg;
                } else {
                    metadata.typeBuilder = arg;
                }
            }
        });

        args.next<WorkflowMetadata>({
            match: (arg) => isString(arg),
            setMetadata: (metadata, arg) => {
                metadata.name = arg;
            }
        });
    }, metadataExtends) as IWorkflowDecorator<T>;

}

/**
 * Workflow decorator, define for class as workflow.
 *
 * @Workflow
 */
export const Workflow: IWorkflowDecorator<WorkflowMetadata> = createWorkflowDecorator<WorkflowMetadata>('Workflow', WorkflowBuilderToken, ActivityBuilderToken);
