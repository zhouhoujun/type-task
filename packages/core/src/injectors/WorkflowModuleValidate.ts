import { InjectModuleValidateToken, BaseModuelValidate, Singleton } from '@ts-ioc/core';
import { Task, Workflow } from '../core';

export const WorkflowModuleValidateToken = new InjectModuleValidateToken(Workflow.toString());

@Singleton(WorkflowModuleValidateToken)
export class WorkflowModuleValidate extends BaseModuelValidate {
    getDecorator() {
        return Workflow.toString();
    }
}


export const ActvityModuleValidateToken = new InjectModuleValidateToken(Task.toString());

@Singleton(ActvityModuleValidateToken)
export class ActvityModuleValidate extends BaseModuelValidate {
    getDecorator() {
        return Task.toString();
    }
}
