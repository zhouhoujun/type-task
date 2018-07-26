import { IContainer, Token, Injectable } from '@ts-ioc/core';
import { IConfigure, ActivityRunnerToken, ActivityBuilderToken, ActivityBuilder, IActivity, ActivityRunner, ActivityType, IActivityRunner } from './core';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
import { RootModuleBuilderToken, ModuleBuilder } from '@ts-ioc/bootstrap';


/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
@Injectable(RootModuleBuilderToken)
export class ActivityRunnerBuilder extends ModuleBuilder<any> {

    createBuilder() {
        return new ActivityRunnerBuilder();
    }

    async build(task: ActivityType<IActivity>, data?: any): Promise<IActivityRunner<any>> {
        return this.container.resolve(ActivityRunnerToken, { activity: task, builder: ActivityBuilderToken });
    }

    protected resolveToken(container: IContainer, token: Token<IActivity>, config: IConfigure): any {
        console.log('resolved----------------\n', token);
        return container.resolve(ActivityRunnerToken, { activity: config, builder: ActivityBuilderToken });
    }

    protected async registerExts(container: IContainer, config: IConfigure) {
        console.log('registerExts----------------\n', config);
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

