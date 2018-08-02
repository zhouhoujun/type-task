import { IContainer, Token, Injectable, lang } from '@ts-ioc/core';
import { IConfigure, ActivityRunnerToken, ActivityBuilderToken, IActivityRunner, ActivityType, IActivity, SequenceConfigure, ActivityBuilder, UUIDToken, RandomUUIDFactory } from './core';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
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


    protected async registerExts(container: IContainer, config: IConfigure) {
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

