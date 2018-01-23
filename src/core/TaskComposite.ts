import { GComponent, GComposite } from 'tsioc';
import { TaskComponent } from './TaskComponent';
import { TaskContext } from './TaskContext';


export class TaskComposite extends GComposite<TaskComponent> implements TaskComponent {

    constructor(taskName: string) {
        super(taskName)
    }

    getContext(): TaskContext {
        return null;
    }

    run(taskname?: string): Promise<any> {
        if (taskname) {
            return this.find(task => task.name === taskname).run();
        } else {
            this.each(task => {
                task.run()
            })
            return null;
        }
    }
}
