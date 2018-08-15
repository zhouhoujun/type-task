import { IModuleBuilder, InjectModuleBuilderToken } from '@ts-ioc/bootstrap';
import { IActivity, IWorkflow, Activity, DefaultWorkflow } from './core';
import { Token, Registration } from '@ts-ioc/core';


export interface IWorkflowBuilder<T extends IActivity> extends IModuleBuilder<T> {

}

export class InjectWorkflowBuilderToken<T extends IActivity> extends Registration<IWorkflowBuilder<T>> {
    constructor(type: Token<any>) {
        super(type, 'WorkflowBuilder');
    }
}


export const WorkflowBuilderToken = new InjectWorkflowBuilderToken(DefaultWorkflow);


export const ActivityflowBuilderToken = new InjectModuleBuilderToken<IWorkflow<any>>(Activity);


