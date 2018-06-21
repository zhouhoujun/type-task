import { IContainer, Type, ApplicationBuilder, hasClassMetadata, lang } from '@ts-ioc/core';
import { ITaskRunner, IConfigure, TaskRunnerToken, ITask, TaskBuilderToken, ITaskBuilder } from './core/index';
import { ITaskContainer, TaskContainerToken } from './ITaskContainer';
import { AopModule, Aspect } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';
import { CoreModule } from './CoreModule';
import { TaskType } from './core/index';
import { PipeElement } from '@taskfr/pipes';


/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
export class DefaultTaskContainer extends ApplicationBuilder<ITask> implements ITaskContainer {

    protected logAspect: Type<any>;
    constructor(public rootPath: string) {
        super(rootPath)
    }

    useLog(logAspect: Type<any>): this {
        if (hasClassMetadata(Aspect, logAspect)) {
            this.logAspect = logAspect;
        } else {
            console.error('logAspect param is not right aspect');
        }
        return this;
    }

    /**
     * bootstrap application via main module
     *
     * @param {...tasks: TaskType<ITask>[]} bootModule
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    bootstrap(...tasks: TaskType<ITask>[]): Promise<ITaskRunner> {
        let task = (tasks.length > 1) ? { children: tasks, task: PipeElement } : lang.first(tasks);
        return super.bootstrap(task)
            .then(instance => {
                let runner = this.getContainer().resolve(TaskRunnerToken, { work: task, instance: instance, taskBuilder: this.getModuleBuilder() });
                runner.start();
                return runner;
            });
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

        container.register(this.logAspect);

        await super.registerExts(container);
        return container;
    }

    protected setConfigRoot(config: IConfigure) {
        config.rootdir = this.rootPath;
    }
}

