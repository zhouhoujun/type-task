import 'mocha';
import { expect } from 'chai';
import { ITaskContainer, TaskContainer, TaskElement } from '../src';
import { SimpleTask, SimpleCTask, TaskModuleTest } from './simples.task';

describe('auto register with build', () => {

    let container: ITaskContainer;
    before(async () => {
        container = new TaskContainer(__dirname);
    });

    it('should bootstrap with single task.', async () => {
        let result = await container.bootstrap(SimpleTask).toPromise();
        expect(result).eq('simple task');
    });

    it('should bootstrap with single task via name or provider.', async () => {
        let result = await container.use(SimpleTask).bootstrap('test').toPromise();
        expect(result).eq('simple task');
    });

    it('should bootstrap with component task.', async () => {
        let result = await container.bootstrap(SimpleCTask).toPromise();
        expect(result).eq('component task');
    });

    it('should bootstrap with component task via name or provider.', async () => {
        let result = await container.use(SimpleCTask).bootstrap('comptest').toPromise();
        expect(result).eq('component task');
    });

    it('should bootstrap with IConfigure.', async () => {
        let result = await container.bootstrap({
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
        }).toPromise();
        expect(result).eq('component task');
    });

    it('should bootstrap with decorator IConfigure.', async () => {
        let result = await container.bootstrap(TaskModuleTest).toPromise();
        expect(result).eq('component task');
    });

});

