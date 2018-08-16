import { IContainer, Singleton, Token } from '@ts-ioc/core';
import { ActivityType, IActivity, UUIDToken, RandomUUIDFactory, ActivityConfigure, Task, ActivityBuilderToken, Activity } from './core';
import { ModuleBuilder, LoadedModule, Runnable } from '@ts-ioc/bootstrap';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
import { WorkflowBuilderToken } from './ITaskContainer';

/**
 * default Workflow Builder.
 *
 * @export
 * @class DefaultTaskContainer
 */
@Singleton(WorkflowBuilderToken)
export class DefaultWorkflowBuilder extends ModuleBuilder<IActivity> {

    /**
     * bootstrap workflow via activity.
     *
     * @param {ActivityType<IActivity>} activity
     * @param {(IContainer | LoadedModule)} [defaults]
     * @param {string} [workflowId]
     * @returns {Promise<IActivityRunner<any>>}
     * @memberof DefaultWorkflowBuilder
     */
    async bootstrap(activity: ActivityType<IActivity>, defaults?: IContainer | LoadedModule, workflowId?: string): Promise<Runnable<IActivity>> {
        let container = this.getContainer(activity, defaults);
        workflowId = workflowId || this.createUUID(container);
        let runner = await super.bootstrap(activity, defaults, workflowId);
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
        return config.activity || config.task || super.getBootType(config);
    }

    protected getConfigId(config: ActivityConfigure) {
        let id = config.id || config.name;
        return id;
    }

    // protected getType(config: ActivityConfigure): Token<any> {
    //     return config.activity || config.task || super.getType(config);
    // }
}

