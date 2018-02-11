import { TaskComposite } from './TaskComposite';
import { IContext } from './IContext';
import { Task } from './decorators/index';


/**
 * run tasks with context.
 *
 * @export
 * @class TaskContext
 * @extends {TaskComposite}
 */
@Task()
export class TaskContext extends TaskComposite {

    constructor(public context: IContext) {
        super(context.name);
    }

    onInit() {
        if (this.context.loader) {
            this.use(this.context.loader);
        }
    }


    protected execute(): Promise<any> {
        this.context
        return Promise.resolve();
    }
}
