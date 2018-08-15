import { IContainer, Singleton, Token } from '@ts-ioc/core';
import { IWorkflow, UUIDToken, RandomUUIDFactory, ActivityConfigure, Task, ActivityBuilderToken, WorkflowType, WorkflowConfig } from './core';
import { ModuleBuilder, LoadedModule } from '@ts-ioc/bootstrap';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
import { WorkflowBuilderToken } from './IWorkflowBuilder';


/**
 * workflow builder.
 *
 * @export
 * @class WorkflowBuilder
 */
@Singleton(WorkflowBuilderToken)
export class WorkflowBuilder extends ModuleBuilder<IWorkflow<any>> {

    /**
     * bootstrap workflow
     *
     * @param {WorkflowType} workflow
     * @param {(IContainer | LoadedModule)} [defaults]
     * @param {string} [workflowId]
     * @returns {Promise<IWorkflow<any>>}
     * @memberof WorkflowBuilder
     */
    async bootstrap(workflow: WorkflowType, defaults?: IContainer | LoadedModule, workflowId?: string): Promise<IWorkflow<any>> {
        let container = this.getContainer(workflow, defaults);
        workflowId = workflowId || this.createUUID(container);
        let instance = await super.bootstrap(workflow, defaults, workflowId);
        return instance;
    }

    protected createUUID(container: IContainer) {
        if (!container.has(UUIDToken)) {
            container.register(RandomUUIDFactory);
        }
        return container.get(UUIDToken).generate();
    }

    protected async registerExts(container: IContainer, config: WorkflowConfig): Promise<IContainer> {
        await super.registerExts(container, config);
        if (!container.has(AopModule)) {
            container.register(AopModule);
        }

        if (!container.has(LogModule)) {
            container.register(LogModule);
        }

        if (!container.has(CoreModule)) {
            container.register(CoreModule);
        }

        return container;
    }

    getDefaultTypeBuilder(container: IContainer) {
        return container.resolve(ActivityBuilderToken);
    }

    getDecorator() {
        return Task.toString();
    }

    protected getBootTyp(config: ActivityConfigure): Token<any> {
        return config.activity || config.task;
    }

    protected getConfigId(config: ActivityConfigure) {
        return config.id || config.name;
    }

    // protected getType(config: ActivityConfigure): Token<any> {
    //     return config.token || config.type;
    // }
}

