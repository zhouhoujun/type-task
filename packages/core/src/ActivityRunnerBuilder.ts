import { IContainer, Singleton } from '@ts-ioc/core';
import { ActivityRunnerToken, IActivityRunner, ActivityType, IActivity, UUIDToken, RandomUUIDFactory, ActivityModuleBuilder, IConfigure } from './core';
import { InjectModuleBuilder } from '@ts-ioc/bootstrap';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';

export const ActivityRunnerBuilderToken = new InjectModuleBuilder<ActivityRunnerBuilder>('activity_runner');

/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
@Singleton(ActivityRunnerBuilderToken)
export class ActivityRunnerBuilder extends ActivityModuleBuilder {

    /**
     * bootstrap application via main module
     *
     * @param {activity: ActivityType<IActivity>} bootModule
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    async bootstrap(activity: ActivityType<IActivity>, defaultContainer?: IContainer, workflowId?: string): Promise<IActivityRunner<any>> {
        let container = this.getContainer(activity, defaultContainer);
        workflowId = workflowId || this.createUUID(container);
        console.log('workflowId:', workflowId);
        let instance = await super.bootstrap(activity, defaultContainer, workflowId);
        let runner = container.resolve(ActivityRunnerToken, { activities: activity, instance: instance, uuid: workflowId });
        await runner.start();
        return runner;
    }

    protected createUUID(container: IContainer) {
        if (!container.has(UUIDToken)) {
            container.register(RandomUUIDFactory);
        }
        return container.get(UUIDToken).generate();
    }

    protected async registerExts(container: IContainer, config: IConfigure): Promise<IContainer> {
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
}

