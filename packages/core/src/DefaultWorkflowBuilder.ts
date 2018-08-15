import { IContainer, Singleton, Token } from '@ts-ioc/core';
import { WorkflowToken, IWorkflow, ActivityType, IActivity, UUIDToken, RandomUUIDFactory, ActivityConfigure, Task, ActivityBuilderToken, Activity } from './core';
import { ModuleBuilder, LoadedModule } from '@ts-ioc/bootstrap';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
import { IWorkflowBuilder, ActivityflowBuilderToken } from './IWorkflowBuilder';


/**
 * default Workflow Builder.
 *
 * @export
 * @class DefaultTaskContainer
 */
@Singleton(ActivityflowBuilderToken)
export class DefaultWorkflowBuilder extends ModuleBuilder<IActivity> implements IWorkflowBuilder<IActivity> {

    /**
     * bootstrap workflow via activity.
     *
     * @param {ActivityType<IActivity>} activity
     * @param {(IContainer | LoadedModule)} [defaults]
     * @param {string} [workflowId]
     * @returns {Promise<IWorkflow<any>>}
     * @memberof DefaultWorkflowBuilder
     */
    async bootstrap(activity: ActivityType<IActivity>,  defaults?: IContainer | LoadedModule, workflowId?: string): Promise<IWorkflow<any>> {
        let container = this.getContainer(activity, defaults);
        workflowId = workflowId || this.createUUID(container);
        let instance = await super.bootstrap(activity, defaults, workflowId);
        let runner = container.resolve(WorkflowToken, { activities: activity, instance: instance, uuid: workflowId });
        await runner.start();
        return runner;
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


    getDefaultTypeBuilder(container: IContainer) {
        return container.resolve(ActivityBuilderToken);
    }

    getDecorator() {
        return Task.toString();
    }

    protected createUUID(container: IContainer) {
        if (!container.has(UUIDToken)) {
            container.register(RandomUUIDFactory);
        }
        return container.get(UUIDToken).generate();
    }

    protected getBootTyp(config: ActivityConfigure): Token<any> {
        return config.activity || config.task;
    }

    protected getConfigId(config: ActivityConfigure) {
        let id = config.id || config.name;
        console.log('get configue id:', config, id);
        return id;
    }

    // protected getType(config: ActivityConfigure): Token<any> {
    //     return config.token || config.type;
    // }
}

