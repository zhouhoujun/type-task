import { DIModuleInjector, InjectedModule, InjectedModuleToken } from '@ts-ioc/bootstrap';
import { InjectModuleInjectorToken, Injectable, Inject, IModuleValidate, IContainer, Type } from '@ts-ioc/core';
import { Task, Workflow } from '../core';
import { WorkflowModuleValidateToken } from './WorkflowModuleValidate';

export const WorkflowModuleInjectorToken = new InjectModuleInjectorToken(Workflow.toString());

@Injectable(WorkflowModuleInjectorToken)
export class WorkflowModuleInjector extends DIModuleInjector {

    constructor(@Inject(WorkflowModuleValidateToken) validate: IModuleValidate) {
        super(validate)
    }
}

export const ActivityModuleInjectorToken = new InjectModuleInjectorToken(Task.toString());

@Injectable(ActivityModuleInjectorToken)
export class ActivityModuleInjector extends DIModuleInjector {

    constructor(@Inject(WorkflowModuleValidateToken) validate: IModuleValidate) {
        super(validate)
    }

    protected async importModule(container: IContainer, type: Type<any>): Promise<InjectedModule<any>> {
        container.register(type);
        let metaConfig = this.getMetaConfig(type, container);
        await this.registerConfgureDepds(container, metaConfig);

        let injMd = new InjectedModule(type, metaConfig, container);
        container.bindProvider(new InjectedModuleToken(type), injMd);

        return injMd;
    }
}

