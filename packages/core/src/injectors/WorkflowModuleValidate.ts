import { InjectModuleValidateToken, BaseModuelValidate, Singleton } from '@ts-ioc/core';
import { Task, Workflow } from '../decorators';

export const WorkflowModuleValidateToken = new InjectModuleValidateToken(Workflow.toString());

@Singleton(WorkflowModuleValidateToken)
export class WorkflowModuleValidate extends BaseModuelValidate {
    getDecorator() {
        return [Workflow.toString(), Task.toString()];
    }
}
