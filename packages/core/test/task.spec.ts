import 'mocha';
import { expect } from 'chai';
import { ITaskContainer, DefaultTaskContainer, TaskElement, IConfigure, TaskRunner } from '../src';

import { SimpleTask, SimpleCTask, TaskModuleTest } from './simples.task';

describe('auto register with build', () => {

    let container: ITaskContainer;
    before(async () => {
        container = new DefaultTaskContainer(__dirname);
    });

    it('should bootstrap with single task.', async () => {
        let runner = await container.bootstrap(SimpleTask);
        expect(runner instanceof TaskRunner).eq(true);
        let result = await runner.start();
        expect(result).eq('simple task');
    });

    it('should bootstrap with single task via name or provider.', async () => {
        let result = await container.useModules(SimpleTask).bootstrap('test');
        expect(result.resultValue).eq('simple task');
    });

    it('should bootstrap with component task.', async () => {
        let result = await container.bootstrap(SimpleCTask);
        expect(result.resultValue).eq('component task');
    });

    it('should bootstrap with component task via name or provider.', async () => {
        let result = await container.useModules(SimpleCTask).bootstrap('comptest');
        expect(result.resultValue).eq('component task');
    });

    it('should bootstrap with IConfigure.', async () => {
        let result = await container.bootstrap({
            name: 'test1',
            task: TaskElement,
            children: [
                {
                    name: 'test------1',
                    task: SimpleTask
                },
                {
                    name: 'test------2',
                    task: SimpleCTask
                }
            ]
        });
        expect(result.resultValue).eq('component task');
    });

    it('should bootstrap with IConfigure.', async () => {
        let result = await container.bootstrap(TaskModuleTest);
        expect(result.resultValue).eq('component task');
    });

});

