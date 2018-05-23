import { GComposite, IContainer, Type, IContainerBuilder, Inject, Mode, isClass, Abstract, ContainerBuilderToken, ModuleType, Injectable, ContainerToken } from '@ts-ioc/core';
import { ITaskComponent } from './ITaskComponent';
import { IConfigure } from './IConfigure';
import { ITask } from './ITask';
import { RunWay } from './RunWay';
import { IBuilder, BuilderToken } from './IBuilder';
import { ITaskOption } from './ITaskOption';
import { ITaskRunner, TaskRunnerToken } from './ITaskRunner';

/**
 * task component.
 *
 * @export
 * @class TaskComponent
 * @extends {GComposite<ITaskComponent>}
 * @implements {TaskComponent}
 */
@Abstract()
export abstract class TaskComponent<T extends ITaskComponent> extends GComposite<T> implements ITaskComponent {

    @Inject(ContainerToken)
    container: IContainer;

    config?: IConfigure;

    constructor(name: string, public runWay = RunWay.seqFirst, config?: IConfigure) {
        super(name);
        this.config = config;
    }

    getConfig(): IConfigure {
        return this.find(cmp => !!cmp.config, Mode.route).config;
    }

    getRunner(): ITaskRunner {
        return this.container.get(TaskRunnerToken);
    }

    private builded: Promise<ITaskComponent>;
    protected build() {
        if (!this.builded) {
            this.builded = this.config ?
                this.container.resolve(this.config.builder || BuilderToken).build(this.config, this)
                : Promise.resolve(this);
        }
        return this.builded;
    }

    async run(data?: any): Promise<any> {
        let component = await this.build();

        let execPromise: Promise<any>;
        if (this.runWay & RunWay.nodeFirst) {
            execPromise = this.execute(data);
        } else {
            execPromise = Promise.resolve(data);
        }

        if (this.runWay & RunWay.sequence) {
            this.each(task => {
                execPromise = execPromise.then(data => task.run(data));
            }, Mode.children);
        } else if (this.runWay & RunWay.parallel) {
            execPromise = execPromise.then(pdata => {
                return Promise.all(this.children.map(task => task.run(pdata)));
            });
        }

        if (this.runWay & RunWay.nodeLast) {
            execPromise = execPromise.then(data => this.execute(data));
        }

        let result = await execPromise;
        return result;
    }

    /**
     * execute tasks
     *
     * @protected
     * @param {*} data
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    protected abstract execute(data: any): Promise<any>;

}
