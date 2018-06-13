import { TaskElement } from '@taskp/core';
import { PipeTask, PipeModule, PipeElement, TsCompile } from '@taskp/pipes';
import { TaskContainer } from '@taskp/platform-server';

import * as mocha from 'gulp-mocha';
const del = require('del');


@PipeTask({
    name: 'test',
    src: 'test/**/*.spec.ts',
    awaitPiped: true,
    pipes: [() => mocha()],
    task: PipeElement
})
class TestTask extends TaskElement {
    execute(data?: any): Promise<any> {
        return del(['lib/**', 'bin/**']);
    }
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap([
        TestTask,
        {
            name: 'tscompLIB',
            src: ['src/**/*.ts', '!src/cli/**'],
            dest: 'lib',
            uglify: true,
            task: TsCompile
        }
    ]);
