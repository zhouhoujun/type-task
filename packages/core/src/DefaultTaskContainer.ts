import { Type, hasClassMetadata, lang, IContainer, LoadType, isToken } from '@ts-ioc/core';
import { SequenceConfigure, Active, IActivityRunner, UUIDToken, RandomUUIDFactory, ActivityConfigure, ActivityBuilderToken } from './core';
import { ITaskContainer, WorkflowBuilderToken } from './ITaskContainer';
import { IApplicationBuilder, DefaultApplicationBuilder, AppConfigure } from '@ts-ioc/bootstrap';
import { Aspect, AopModule } from '@ts-ioc/aop';
import { SequenceActivity } from './activities';
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
            this.builder
                .use(AopModule)
                .use(LogModule)
                .use(CoreModule);
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
    async createActivity(activity: Active, workflowId?: string): Promise<IActivityRunner<any>> {
        let boot: Active;
        workflowId = workflowId || this.createUUID();

        if (isToken(activity)) {
            boot =  { id: workflowId, token: activity, builder: WorkflowBuilderToken, annotationBuilder: ActivityBuilderToken };
        } else {
            boot = activity || {};
            boot.id = workflowId;
            boot.builder = boot.builder || WorkflowBuilderToken;
            boot.annotationBuilder = boot.annotationBuilder || ActivityBuilderToken;
        }
        let runner = await this.getBuilder().bootstrap(boot, null, workflowId) as IActivityRunner<any>;
        this.getContainer().bindProvider(workflowId, runner);
        return runner;
    }

    protected createUUID() {
        let container = this.getContainer()
        if (!container.has(UUIDToken)) {
            container.register(RandomUUIDFactory);
        }
        return container.get(UUIDToken).generate();
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
        let runner = await this.createActivity(workflow);
        return runner;
    }

}

