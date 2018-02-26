import { Task, ITask, taskSymbols, TaskContainer, AbstractTask } from '../src';
import { Inject } from 'tsioc';

@Task('test')
class SimpleTask extends AbstractTask implements ITask {

    constructor(name: string) {
        super(name);
    }

    run(): Promise<any> {
        console.log('before simple task:', this.name);
        return Promise.resolve('simple task')
            .then(val => {
                console.log('return simple task:', val);
                return val;
            });
    }
}


let container = new TaskContainer(__dirname);

// container.use({ modules: [SimpleTask] });
container.bootstrap(SimpleTask)
    .then(val => {
        console.log('after run task:', val);
    });

let container2 = new TaskContainer(__dirname);
container.use({ modules: [SimpleTask] })
    .bootstrap('test')
    .then(val => {
        console.log('after run task:', val);
    });
