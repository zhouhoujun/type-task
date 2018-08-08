import { createClassDecorator, IInjectableDecorator, ITypeDecorator } from '@ts-ioc/core';
import { WorkflowMetadata } from '../metadatas';

/**
 * workflow decorator.
 *
 * @export
 * @interface IWorkflowDecorator
 * @extends {ITypeDecorator<T>}
 * @template T
 */
export interface IWorkflowDecorator<T extends WorkflowMetadata> extends ITypeDecorator<T> {
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
     */
    (target: Function): void;

}

/**
 * Workflow decorator, define for class as workflow.
 *
 * @Workflow
 */
export const Workflow: IInjectableDecorator = createClassDecorator<WorkflowMetadata>('Workflow');
