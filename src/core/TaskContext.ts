import { TaskComponent } from './TaskComponent';
import { IContext } from './IContext';
import { Task } from './decorators/index';
import { ITaskContext } from './ITaskContext';
import { Mode, Type, Provider, Providers, Component, hasOwnClassMetadata } from 'tsioc';
import { RunWay } from './RunWay';
import { IBuilder } from './IBuilder';
import { isArray } from 'util';


/**
 * run tasks with context.
 *
 * @export
 * @class TaskContext
 * @extends {TaskComponent}
 */
@Task('context')
export class TaskContext extends TaskComponent<ITaskContext> implements ITaskContext {

    constructor(public context: IContext) {
        super(context.name, context.runWay);
    }

    getContext<T extends IContext>(): T {
        let comp = this.find(comp => {
            return !!comp.context
        }, Mode.route);
        return comp.context as T;
    }

    onInit() {
        if (this.context && this.context.loader) {
            if (isArray(this.context.loader)) {
                this.use(...this.context.loader);
            } else {
                this.use(this.context.loader);
            }
        }
    }

    build(types: Type<any>[]) {
        this.context.builder.build(this, this.context, ...types);
    }

    protected execute(data: any): Promise<any> {
        return Promise.resolve(data);
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
