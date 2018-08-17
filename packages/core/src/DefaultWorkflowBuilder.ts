import { IContainer, Singleton, Token, Providers } from '@ts-ioc/core';
import { ActivityType, IActivity, UUIDToken, RandomUUIDFactory, ActivityConfigure, Task, ActivityBuilderToken, ActivityRunnerToken } from './core';
import { ModuleBuilder, ModuleEnv, Runnable, IService } from '@ts-ioc/bootstrap';
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
     * @param {ModuleEnv} [env]
     * @param {string} [workflowId]
     * @returns {Promise<IActivityRunner<any>>}
     * @memberof DefaultWorkflowBuilder
     */
    async bootstrap(activity: ActivityType<IActivity>, env?: ModuleEnv, workflowId?: string): Promise<Runnable<IActivity>> {
        let container = this.getContainer(activity, env);
        workflowId = workflowId || this.createUUID(container);
        let runner = await super.bootstrap(activity, env, workflowId);
        console.log(runner, activity);
        return runner;
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
        return config.id || config.name;
    }

    protected getDefaultService(container: IContainer, ...providers: Providers[]): IService<IActivity> {
        return container.resolve(ActivityRunnerToken, ...providers);
    }

    // protected getType(config: ActivityConfigure): Token<any> {
    //     return config.activity || config.task || super.getType(config);
    // }
}

