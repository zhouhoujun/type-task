import { IContainer, Type, ApplicationBuilder, hasClassMetadata, lang } from '@ts-ioc/core';
import { ITaskRunner, IConfigure, TaskRunnerToken, IActivity, TaskBuilderToken, ITaskBuilder, TaskElement, TaskBuilder, TaskType } from './core';
import { ITaskContainer, TaskContainerToken } from './ITaskContainer';
import { AopModule, Aspect } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';


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

    protected createRunner(task: TaskType<IActivity>, instance: IActivity) {
        return this.getContainer().resolve(TaskRunnerToken, { work: task, instance: instance, taskBuilder: this.getModuleBuilder() });
    }

    /**
     * create workflow
     *
     * @param {...TaskType<IActivity>[]} tasks
     * @returns {Promise<ITaskRunner>}
     * @memberof ITaskContainer
     */
    createWorkflow(...tasks: TaskType<IActivity>[]): Promise<ITaskRunner> {
        let task = (tasks.length > 1) ? { children: tasks, task: TaskElement } : lang.first(tasks);
        return super.bootstrap(task)
            .then(instance => {
                return this.createRunner(task, instance);
            });
    }

    /**
     * bootstrap application via main module
     *
     * @param {...tasks: TaskType<ITask>[]} bootModule
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    async bootstrap(...tasks: TaskType<IActivity>[]): Promise<ITaskRunner> {
        let runner = await this.createWorkflow(...tasks);
        await runner.start();
        return runner;
    }

    getRootPath() {
        return this.rootPath;
    }

    protected createModuleBuilder(): ITaskBuilder {
        return this.getContainer().get(TaskBuilderToken);
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

        this.beforRegister(container);

        await super.registerExts(container);
        return container;
    }

    protected beforRegister(container: IContainer) {
        this.logAspects.forEach(logger => {
            logger && container.register(logger);
        });
    }

    protected setConfigRoot(config: IConfigure) {
        config.rootdir = this.rootPath;
    }
}

