import { GComposite, IContainer, Type, IContainerBuilder, Inject, Mode, isClass, Abstract, ContainerBuilderToken, ModuleType, Injectable, ContainerToken, Token } from '@ts-ioc/core';
import { ITaskComponent } from './ITaskComponent';
import { IConfigure } from './IConfigure';
import { ITask } from './ITask';
import { RunWay } from './RunWay';
import { ITaskBuilder, TaskBuilderToken } from './ITaskBuilder';
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

    /**
     * task config.
     *
     * @type {IConfigure}
     * @memberof TaskComponent
     */
    config: IConfigure;

    /**
     * run way, default sequence node first
     *
     * @memberof TaskComponent
     */
    runWay = RunWay.seqFirst;

    constructor(name?: string) {
        super(name);
    }

    async run(data?: any): Promise<any> {
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

    getRoot(): ITaskComponent {
        return this.find(it => !it.parent, Mode.route);
    }


    getRunner(task: Token<ITask> | Type<any> | IConfigure, instance?: any, builder?: ITaskBuilder) {
        return this.container.resolve(TaskRunnerToken, { work: task, instance: instance, taskBuilder: builder })
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
