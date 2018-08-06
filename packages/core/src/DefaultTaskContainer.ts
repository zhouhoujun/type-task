import { Type, hasClassMetadata, lang, IContainer, LoadType, isToken } from '@ts-ioc/core';
import { SequenceConfigure, IActivityRunner, Active, IConfigure } from './core';
import { ITaskContainer } from './ITaskContainer';
import { IApplicationBuilder, DefaultApplicationBuilder, AppConfigure, ModuleConfigure } from '@ts-ioc/bootstrap';
import { Aspect, AopModule } from '@ts-ioc/aop';
import { SequenceActivity } from './activities';
import { ActivityRunnerBuilderToken } from './ActivityRunnerBuilder';
import { CoreModule } from './CoreModule';
import { LogModule } from '@ts-ioc/logs';


/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
export class DefaultTaskContainer implements ITaskContainer {

    constructor(public baseURL: string) {
    }

    protected container: IContainer;
    getContainer(): IContainer {
        if (!this.container) {
            this.container = this.getBuilder().getPools().getDefault();
        }
        return this.container;
    }


    protected builder: IApplicationBuilder<any>;
    getBuilder(): IApplicationBuilder<any> {
        if (!this.builder) {
            this.builder = this.createAppBuilder();
            this.builder.use(CoreModule);
            // .use(AopModule)
            // .use(LogModule);
        }
        return this.builder;
    }

    protected createAppBuilder() {
        return new DefaultApplicationBuilder(this.baseURL);
    }

    /**
     * use custom configuration.
     *
     * @param {(string | AppConfiguration)} [config]
     * @param {IContainer} [container]
     * @returns {this}
     * @memberof IApplicationBuilder
     */
    useConfiguration(config?: string | AppConfigure, container?: IContainer): this {
        this.getBuilder().useConfiguration(config, container);
        return this;
    }

    /**
     * use module
     *
     * @param {...LoadType[]} modules
     * @returns {this}
     * @memberof IApplicationBuilder
     */
    use(...modules: LoadType[]): this {
        this.getBuilder().use(...modules);
        return this;
    }

    useLog(logAspect: Type<any>): this {
        if (hasClassMetadata(Aspect, logAspect)) {
            this.getBuilder().use(logAspect);
        } else {
            console.error('logAspect param is not right aspect');
        }
        return this;
    }

    getWorkflow<T>(workflowId: string): IActivityRunner<T> {
        return this.getContainer().resolve(workflowId);
    }

    /**
     * create workflow.
     *
     * @param {Active} activity
     * @param {string} [workflowId]
     * @memberof ITaskContainer
     */
    async createWorkflow(activity: Active, workflowId?: string): Promise<IActivityRunner<any>> {
        let boot: IConfigure;
        if (isToken(activity)) {
            boot = { bootstrap: activity, builder: ActivityRunnerBuilderToken };
        } else {
            boot = activity;
            boot.builder = ActivityRunnerBuilderToken;
        }
        let runner = await this.getBuilder().bootstrap(boot, null, workflowId) as IActivityRunner<any>;
        this.getContainer().bindProvider(runner.getUUID(), runner);
        return runner;
    }

    /**
     * create workflow and bootstrap.
     *
     * @param {...Active[]} activites
     * @returns {Promise<IActivityRunner<any>>}
     * @memberof DefaultTaskContainer
     */
    async bootstrap(...activites: Active[]): Promise<IActivityRunner<any>> {
        let workflow = (activites.length > 1) ? <SequenceConfigure>{ sequence: activites, task: SequenceActivity } : lang.first(activites);
        let runner = await this.createWorkflow(workflow);
        return runner;
    }

}

