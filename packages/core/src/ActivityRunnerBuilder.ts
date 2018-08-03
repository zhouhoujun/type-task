import { IContainer, Injectable } from '@ts-ioc/core';
import { ActivityRunnerToken, IActivityRunner, ActivityType, IActivity, UUIDToken, RandomUUIDFactory, ActivityBuilder } from './core';
import { InjectModuleBuilder } from '@ts-ioc/bootstrap';

export const ActivityRunnerBuilderToken = new InjectModuleBuilder<ActivityRunnerBuilder>('activity_runner');

/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
@Injectable(ActivityRunnerBuilderToken)
export class ActivityRunnerBuilder extends ActivityBuilder {

    /**
     * bootstrap application via main module
     *
     * @param {activity: ActivityType<IActivity>} bootModule
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    async bootstrap(activity: ActivityType<IActivity>, workflowId?: string, defaultContainer?: IContainer): Promise<IActivityRunner<any>> {
        let container = this.getContainer(activity, defaultContainer);
        workflowId = workflowId || this.createUUID(container);
        let instance = await super.bootstrap(activity, workflowId, defaultContainer);
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
}

