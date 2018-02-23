import { TaskComposite } from './TaskComposite';
import { IContext } from './IContext';
import { Task } from './decorators/index';
import { ITaskContext } from './ITaskContext';
import { Mode, Type, Provider, Providers } from 'tsioc';


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

    protected getRunTasks(): Type<any>[] {
        let context = this.getContext();
        return context.sort(context.filter(this.registerModules))
    }

    getTaskProvider(type: Type<any>): Providers[] {
        let context = this.getContext();
        if (context.getExecData) {
            return context.getExecData(type) || [];
        }
        return [];
    }

}
