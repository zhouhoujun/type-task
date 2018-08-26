import { IContainer, CoreActions, Inject, ContainerToken, IocExt } from '@ts-ioc/core';
import { ActivityBuilder, ActivityRunner, Task, Workflow, Activity, Context } from './core';
import { RunAspect } from './aop';
import * as activites from './activities';
import * as injectors from './injectors';

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
        lifeScope.registerDecorator(Workflow, CoreActions.bindProvider, CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);
        lifeScope.registerDecorator(Task, CoreActions.bindProvider, CoreActions.cache, CoreActions.componentBeforeInit, CoreActions.componentInit, CoreActions.componentAfterInit);

        container.register(ActivityBuilder)
            .register(ActivityRunner)
            .register(Context)
            .register(RunAspect)
            .register(Activity)
            .use(activites)
            .use(injectors);
    }
}
