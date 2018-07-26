import { ActivityType, IActivity, IActivityRunner, SequenceConfigure, ITaskContainer, SequenceActivity, CoreModule, IConfigure } from '@taskfr/core';
import { LoadType, lang, Token, Type } from '@ts-ioc/core';
import { TaskLogAspect, RunnerLogAspect } from './aop';
import { ServerApplicationBuilder } from '@ts-ioc/platform-server/bootstrap';
import { AopModule } from '@ts-ioc/aop';
import { LogModule } from '@ts-ioc/logs';

/**
 * task container in server.
 *
 * @export
 * @class TaskContainer
 * @extends {DefaultTaskContainer}
 */
export class TaskContainer extends ServerApplicationBuilder<IActivity> implements ITaskContainer {

    constructor(baseURL: string) {
        super(baseURL);
        this.use(TaskLogAspect)
            .use(RunnerLogAspect)
            .use(AopModule)
            .use(LogModule)
            .use(CoreModule);
    }

    /**
     * create task container.
     *
     * @static
     * @param {string} root
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {ITaskContainer}
     * @memberof TaskContainer
     */
    static create(root: string, ...modules: LoadType[]) {
        let taskContainer = new TaskContainer(root);
        if (modules) {
            taskContainer.use(...modules);
        }
        return taskContainer;
    }

    /**
     * create workflow
     *
     * @param {...ActivityType<IActivity>[]} tasks
     * @returns {Promise<IActivityRunner>}
     * @memberof ITaskContainer
     */
    async createWorkflow(...tasks: ActivityType<IActivity>[]): Promise<IActivityRunner<any>> {
        let task = (tasks.length > 1) ? <SequenceConfigure>{ sequence: tasks, task: SequenceActivity } : lang.first(tasks);
        let runner = await this.build(task) as IActivityRunner<any>;
        return runner;
    }

    /**
     * bootstrap application via main module
     *
     * @param {...tasks: ActivityType<IActivity>[]} bootModule
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    async bootstrap(...tasks: ActivityType<IActivity>[]): Promise<IActivityRunner<any>> {
        let task = (tasks.length > 1) ? <SequenceConfigure>{ sequence: tasks, task: SequenceActivity } : lang.first(tasks);
        let runner = await this.build(task); // super.bootstrap(task);
        await runner.start();
        return runner;
    }

    getBootstrapToken(cfg: IConfigure, token?: Token<IActivity> | Type<any>): Token<IActivity> {
        return cfg.task || cfg.bootstrap || token;
    }


    // async build(...tasks: ActivityType<IActivity>[]): Promise<IActivityRunner<any>> {
    //     let task = (tasks.length > 1) ? <SequenceConfigure>{ sequence: tasks, task: SequenceActivity } : lang.first(tasks);
    //     let runner = await super.build(task) as IActivityRunner<any>;
    //     return runner;
    // }
}
