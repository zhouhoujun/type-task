import { IContainer, Token, Injectable } from '@ts-ioc/core';
import { IConfigure, ActivityRunnerToken, ActivityBuilderToken, ActivityBuilder } from './core';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
import { RootModuleBuilderToken } from '@ts-ioc/bootstrap';


/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
@Injectable(RootModuleBuilderToken)
export class ActivityRunnerBuilder extends ActivityBuilder {

    protected resolveToken(container: IContainer, token: Token<any>, config: IConfigure): any {
        return container.resolve(ActivityRunnerToken, { activity: config, builder: ActivityBuilderToken });
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

