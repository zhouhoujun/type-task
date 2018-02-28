import { Task, ITask, taskSymbols, TaskContainer, AbstractTask, TaskElement, TaskComponent, ITaskComponent } from '../src';
import { Inject } from 'tsioc';
import { RunWay } from '../src/core/RunWay';

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
container2.use(SimpleTask)
    .bootstrap('test')
    .then(val => {
        console.log('after run task:', val);
    });


@Task('comptest')
class SimpleCTask extends TaskComponent<ITaskComponent> {

    constructor(name: string, runWay?: RunWay) {
        super(name, runWay);
    }

    protected execute(): Promise<any> {
        console.log('before component task:', this.name);
        return Promise.resolve('component task')
            .then(val => {
                console.log('return component task:', val);
                return val;
            });
    }
}


TaskContainer.create(__dirname, SimpleCTask)
    .bootstrap('comptest')
    .then(val => {
        console.log('after run component task:', val);
    });


TaskContainer.create(__dirname)
    .bootstrap({
        providers: {
            name: 'test'
        },
        task: TaskElement,
        children: [
            {
                task: SimpleCTask
            },
            {
                task: SimpleCTask
            }
        ]
    });
