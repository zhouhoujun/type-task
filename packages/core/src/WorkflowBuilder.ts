import { IContainer, Singleton, Token } from '@ts-ioc/core';
import { WorkflowToken, IWorkflow, ActivityType, IActivity, UUIDToken, RandomUUIDFactory, ActivityConfigure, Workflow, WorkflowConfig, Task, ActivityBuilderToken } from './core';
import { InjectModuleBuilder, ModuleBuilder } from '@ts-ioc/bootstrap';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';

export const WorkflowBuilderToken = new InjectModuleBuilder<WorkflowBuilder>('Workflow');

/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
@Singleton(WorkflowBuilderToken)
export class WorkflowBuilder extends ModuleBuilder<IActivity> {

    /**
     * bootstrap application via main module
     *
     * @param {activity: ActivityType<IActivity>} bootModule
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    async bootstrap(activity: ActivityType<IActivity>, defaultContainer?: IContainer, workflowId?: string): Promise<IWorkflow<any>> {
        let container = this.getContainer(activity, defaultContainer);
        workflowId = workflowId || this.createUUID(container);
        let instance = await super.bootstrap(activity, defaultContainer, workflowId);
        let runner = container.resolve(WorkflowToken, { activities: activity, instance: instance, uuid: workflowId });
        await runner.start();
        return runner;
    }

    protected createUUID(container: IContainer) {
        if (!container.has(UUIDToken)) {
            container.register(RandomUUIDFactory);
        }
        return container.get(UUIDToken).generate();
    }

    protected async registerExts(container: IContainer, config: ActivityConfigure): Promise<IContainer> {
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

    protected getBootstrapToken(config: ActivityConfigure): Token<IActivity> {
        return  config.activity || config.task || config.bootstrap;
    }

    getDefaultTypeBuilder(container: IContainer) {
        return container.resolve(ActivityBuilderToken);
    }

    getDecorator() {
        return Task.toString();
    }
}

