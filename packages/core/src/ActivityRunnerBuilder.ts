import { IContainer, Token, Injectable } from '@ts-ioc/core';
import { IConfigure, ActivityRunnerToken, ActivityBuilderToken, IActivityRunner } from './core';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
import { ModuleBuilder, InjectModuleBuilder } from '@ts-ioc/bootstrap';

export const ActivityRunnerBuilderToken = new InjectModuleBuilder<ActivityRunnerBuilder>('activity_runner');

/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
@Injectable(ActivityRunnerBuilderToken)
export class ActivityRunnerBuilder extends ModuleBuilder<IActivityRunner<any>> {


    protected createModuleInstance(token: Token<any>, container: IContainer): IActivityRunner<any> {
        return container.resolve(ActivityRunnerToken, { activity: token, builder: ActivityBuilderToken });
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

