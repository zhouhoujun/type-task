import { Task, Activity, SequenceActivity } from '../src';

@Task('test')
export class SimpleTask extends Activity<any> {

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
export class SimpleCTask extends SequenceActivity {

    protected after(data?: any): Promise<any> {
        // console.log('before component task:', this.name);
        return Promise.resolve('component task')
            .then(val => {
                console.log('return component task:', val);
                return val;
            });
    }
}


@Task({
    name: 'test-module',
    task: SequenceActivity,
    sequence: [
        {
            name: 'test------3',
            task: SimpleTask
        },
        {
            name: 'test------4',
            task: SimpleCTask
        }
    ]
})
export class TaskModuleTest {

}



// async function test() {

//     let container = new TaskContainer(__dirname);

//     // container.use({ modules: [SimpleTask] });
//     await container.bootstrap(SimpleTask);


//     console.log('\n------------SimpleTask------------------');
//     let container2 = new TaskContainer(__dirname);
//     await container2.use(SimpleTask)
//         .bootstrap('test');

//     console.log('\n-----------SimpleCTask-------------------');
//     await TaskContainer.create(__dirname, SimpleCTask)
//         .bootstrap('comptest');


//     console.log('\n-----------Custome Component-------------------');
//     await TaskContainer.create(__dirname)
//         .bootstrap({
//             providers: {
//                 name: 'test1'
//             },
//             task: TaskElement,
//             children: [
//                 {
//                     providers: { name: 'test------1' },
//                     task: SimpleTask
//                 },
//                 {
//                     providers: { name: 'test------2' },
//                     task: SimpleCTask
//                 }
//             ]
//         });

//     console.log('\n-------------Component Module-----------------');
//     await TaskContainer.create(__dirname)
//         .bootstrap(TaskModuleTest);
// }

// test();
