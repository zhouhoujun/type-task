import { IContainer, CoreActions, Inject, ContainerToken, IocExt } from '@ts-ioc/core';
import { Task, Workflow } from './decorators';
import { RunAspect } from './aop';
import * as injectors from './injectors';
import { ActivityRunner, Context, Activity } from './core';
import * as activites from './activities';
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

        container.use(injectors)
            .register(ActivityRunner)
            .register(Context)
            .register(RunAspect)
            .register(Activity)
            .use(activites);
    }
}
