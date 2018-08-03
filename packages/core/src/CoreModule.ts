import { IContainer, CoreActions, Inject, ContainerToken, IocExt } from '@ts-ioc/core';
import { ActivityBootBuilder, ActivityRunner, Task, Runner, Activity, Context, ActivityBuilder } from './core';
import { RunAspect } from './aop';
import * as activites from './activities';
import { ActivityRunnerBuilder } from './ActivityRunnerBuilder';

/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
@IocExt('setup')
export class CoreModule {
    constructor(@Inject(ContainerToken) private container: IContainer) {
    }

    setup() {
        let container = this.container;
        let lifeScope = container.getLifeScope();
        lifeScope.registerDecorator(Runner, CoreActions.bindProvider, CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        lifeScope.registerDecorator(Task, CoreActions.bindProvider, CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);

        container.register(ActivityBootBuilder);
        container.register(ActivityBuilder);
        container.register(ActivityRunner);
        container.register(Context);
        container.register(RunAspect);
        container.register(Activity);
        container.register(ActivityRunnerBuilder);
        container.use(activites);
    }
}
