import { GComposite, Inject, Mode, Abstract } from '@ts-ioc/core';
import { ITaskComponent } from './ITaskComponent';
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

    constructor(name?: string) {
        super(name);
    }

    /**
     * task context.
     *
     * @type {IContext}
     * @memberof AbstractTask
     */
    @Inject(ContextToken)
    context: IContext;

    /**
     * run way, default sequence node first
     *
     * @memberof TaskComponent
     */
    runWay = RunWay.seqFirst;


    run(data?: any): Promise<any> {
        let execPromise: Promise<any>;

        if (this.runWay & RunWay.nodeFirst) {
            execPromise = this.execute(data);
        } else {
            execPromise = Promise.resolve(data);
        }

        if (this.runWay & RunWay.sequence) {
            this.each(task => {
                execPromise = execPromise.then(pdata => task.run(pdata));
            }, Mode.children);
        } else if (this.runWay & RunWay.parallel) {
            execPromise = execPromise.then(pdata => {
                return Promise.all(this.children.map(task => task.run(pdata)));
            });
        }

        if (this.runWay & RunWay.nodeLast) {
            execPromise = execPromise.then(data => this.execute(data));
        }

        return execPromise;
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
