import { IModuleBuilder } from '@ts-ioc/bootstrap';
import { IActivity } from './core';
import { Registration } from '@ts-ioc/core';


export interface IWorkflowBuilder extends IModuleBuilder<IActivity> {

}

export class InjectWorkflowBuilder<T extends IWorkflowBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('Workflow', desc);
    }
}

export const WorkflowBuilderToken = new InjectWorkflowBuilder<IWorkflowBuilder>('');

export const DefaultWorkflowBuilderToken = new InjectWorkflowBuilder<IWorkflowBuilder>('default');


