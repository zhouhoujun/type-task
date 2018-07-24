import { IContainer, Type, hasClassMetadata, lang } from '@ts-ioc/core';
import { ITaskRunner, IConfigure, TaskRunnerToken, IActivity, ActivityBuilderToken, IActivityBuilder, SequenceConfigure, ActivityResultType, ActivityType } from './core';
import { ITaskContainer, TaskContainerToken } from './ITaskContainer';
import { AopModule, Aspect } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
import * as activites from './activities';
import { ApplicationBuilder } from '@ts-ioc/bootstrap';


/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
export class DefaultTaskContainer extends ApplicationBuilder<IActivity> implements ITaskContainer {

    protected logAspects: Type<any>[];
    constructor(public rootPath: string) {
        super(rootPath)
        this.logAspects = [];
    }

    useLog(logAspect: Type<any>): this {
        if (hasClassMetadata(Aspect, logAspect)) {
            this.logAspects.push(logAspect);
        } else {
            console.error('logAspect param is not right aspect');
        }
        return this;
    }

    /**
     * create workflow
     *
     * @param {...ActivityResultType<IActivity>[]} tasks
     * @returns {Promise<ITaskRunner>}
     * @memberof ITaskContainer
     */
    async createWorkflow(...tasks: ActivityResultType<IActivity>[]): Promise<ITaskRunner<any>> {
        let runner = await this.build(...tasks) as ITaskRunner<any>;
        return runner;
    }

    /**
     * bootstrap application via main module
     *
     * @param {...tasks: ActivityType<IActivity>[]} bootModule
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    async bootstrap(...tasks: ActivityType<IActivity>[]): Promise<ITaskRunner<any>> {
        let runner = await this.build(...tasks);
        await runner.start();
        return runner;
    }


    getRootPath() {
        return this.rootPath;
    }

    async build(...tasks: ActivityType<IActivity>[]): Promise<ITaskRunner<any>> {
        let task = (tasks.length > 1) ? <SequenceConfigure>{ sequence: tasks, task: activites.SequenceActivity } : lang.first(tasks);
        let runner = await super.build(task) as ITaskRunner<any>;
        return runner;
    }

    protected async createInstance(builder: IActivityBuilder, config: IConfigure): Promise<ITaskRunner<any>> {
        return this.getContainer().resolve(TaskRunnerToken, { activity: config, activityBuilder: builder });
    }

    protected createModuleBuilder(): IActivityBuilder {
        return this.getContainer().get(ActivityBuilderToken);
    }


    protected async registerExts(container: IContainer) {
        if (!container.has(AopModule)) {
            container.register(AopModule);
        }
        if (!container.has(LogModule)) {
            container.register(LogModule);
        }

        container.bindProvider(TaskContainerToken, this);
        if (!container.has(CoreModule)) {
            container.register(CoreModule);
        }

        this.use(activites);
        this.beforRegister(container);

        await super.registerExts(container);
        return container;
    }

    protected beforRegister(container: IContainer) {
        this.logAspects.forEach(logger => {
            logger && container.register(logger);
        });
    }
}

