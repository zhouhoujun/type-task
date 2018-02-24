import { TaskComposite } from './TaskComposite';
import { IContext } from './IContext';
import { Task } from './decorators/index';
import { ITaskContext } from './ITaskContext';
import { Mode, Type, Provider, Providers, Component } from 'tsioc';


/**
 * run tasks with context.
 *
 * @export
 * @class TaskContext
 * @extends {TaskComposite}
 */
@Component
export class TaskContext extends TaskComposite<ITaskContext> implements ITaskContext {

    constructor(name: string, public context?: IContext) {
        super(name);
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
        let tasks = super.getRunTasks();
        let context = this.getContext();
        return context.sort(context.filter(tasks));
    }

    getTaskProvider(type: Type<any>): Providers[] {
        let context = this.getContext();
        let providers: Providers[] = [{ context: context }];
        if (context.getExecData) {
            providers.push(context.getExecData(type));
        }
        return providers;
    }

}
