import { TaskComposite } from './TaskComposite';
import { IContext } from './IContext';
import { Task } from './decorators/index';
import { ITaskContext } from './ITaskContext';
import { Mode } from 'tsioc';


/**
 * run tasks with context.
 *
 * @export
 * @class TaskContext
 * @extends {TaskComposite}
 */
export class TaskContext extends TaskComposite<ITaskContext> implements ITaskContext {

    constructor(public context?: IContext) {
        super(context ? context.name : '');
    }

    getContext<T extends IContext>(): T {
        let comp = this.find(comp => {
            return !!comp.context
        }, Mode.route);
        return comp.context as T;
    }

    onInit() {
        if (this.context && this.context.loader) {
            this.use(this.context.loader);
        }
    }

    /**
     * execute tasks
     *
     * @protected
     * @returns {Promise<any>}
     * @memberof TaskComposite
     */
    protected execute(): Promise<any> {
        let exec = Promise.resolve();
        let context = this.getContext();

        context.sort(context.filter(this.registerModules))
            .forEach(task => {
                exec = exec.then(() => {
                    return this.enviroment.container.invoke<any>(task, 'run', { context: context });
                });
            });

        return exec;
    }
}
