import { GComposite, Inject, Mode, Abstract } from '@ts-ioc/core';
import { ITaskComponent } from './ITaskComponent';
import { ITaskConfigure } from './IConfigure';
import { RunWay } from './RunWay';
import { ContextToken, IContext } from './IContext';

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

    /**
     * task context.
     *
     * @type {IContext}
     * @memberof AbstractTask
     */
    @Inject(ContextToken)
    context: IContext;

    /**
     * task config.
     *
     * @type {ITaskConfigure<T>}
     * @memberof TaskComponent
     */
    config: ITaskConfigure<T>;

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
