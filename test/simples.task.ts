import { Task, ITask, taskSymbols, TaskContainer, AbstractTask, TaskElement, TaskComponent, ITaskComponent, TaskModule } from '../src';
import { Inject } from 'tsioc';
import { RunWay } from '../src/core/RunWay';

@Task('test')
class SimpleTask extends AbstractTask implements ITask {

    constructor(name: string) {
        super(name);
    }

    run(): Promise<any> {
        // console.log('before simple task:', this.name);
        return Promise.resolve('simple task')
            .then(val => {
                console.log('return simple task:', val);
                return val;
            });
    }
}



@Task('comptest')
class SimpleCTask extends TaskComponent<ITaskComponent> {

    constructor(name: string, runWay?: RunWay) {
        super(name, runWay);
        // console.log('SimpleCTask', Object.getOwnPropertyDescriptors(this));
    }

    protected execute(): Promise<any> {
        // console.log('before component task:', this.name);
        return Promise.resolve('component task')
            .then(val => {
                console.log('return component task:', val);
                return val;
            });
    }
}


@TaskModule({
    providers: {
        name: 'test-module'
    },
    task: TaskElement,
    children: [
        {
            providers: { name: 'test------3' },
            task: SimpleTask
        },
        {
            providers: { name: 'test------4' },
            task: SimpleCTask
        }
    ]
})
class TaskModuleTest {

}



async function test() {

    let container = new TaskContainer(__dirname);

    // container.use({ modules: [SimpleTask] });
    await container.bootstrap(SimpleTask);


    console.log('\n------------SimpleTask------------------');
    let container2 = new TaskContainer(__dirname);
    await container2.use(SimpleTask)
        .bootstrap('test');

    console.log('\n-----------SimpleCTask-------------------');
    await TaskContainer.create(__dirname, SimpleCTask)
        .bootstrap('comptest');


    console.log('\n-----------Custome Component-------------------');
    await TaskContainer.create(__dirname)
        .bootstrap({
            providers: {
                name: 'test1'
            },
            task: TaskElement,
            children: [
                {
                    providers: { name: 'test------1' },
                    task: SimpleTask
                },
                {
                    providers: { name: 'test------2' },
                    task: SimpleCTask
                }
            ]
        });

    console.log('\n-------------Component Module-----------------');
    await TaskContainer.create(__dirname)
        .bootstrap(TaskModuleTest);
}

test();
