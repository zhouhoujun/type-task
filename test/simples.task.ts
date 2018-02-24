import { Task, ITask, taskSymbols, TaskContainer, AbstractTask } from '../src';
import { Inject } from 'tsioc';

@Task // ('test')
class SimpleTask extends AbstractTask implements ITask {

    constructor(name: string) {
        super(name);
    }

    run(): Promise<any> {
        console.log('simple task:', this.name);
        return Promise.resolve('simple task');
    }
}


let container = new TaskContainer(__dirname);

container.use({ modules: [SimpleTask] });
container.run();
