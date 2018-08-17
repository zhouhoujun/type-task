import { IContainer, CoreActions, Inject, ContainerToken, IocExt } from '@ts-ioc/core';
import { ActivityBuilder, ActivityRunner, Task, Workflow, Activity, Context } from './core';
import { RunAspect } from './aop';
import * as activites from './activities';
import { DefaultWorkflowBuilder } from './DefaultWorkflowBuilder';
import { AnnotationBuilderToken, DefaultAnnotationBuilderToken, DefaultModuleBuilderToken, DefaultServiceToken } from '@ts-ioc/bootstrap';

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

        container.register(ActivityBuilder);
        // container.bindProvider(DefaultAnnotationBuilderToken, ActivityBuilder);
        container.register(ActivityRunner);
        // container.bindProvider(DefaultServiceToken, ActivityRunner);
        container.register(Context);
        container.register(RunAspect);
        container.register(Activity);
        container.register(DefaultWorkflowBuilder);
        // container.bindProvider(DefaultModuleBuilderToken, DefaultWorkflowBuilder);
        container.use(activites);
    }
}
