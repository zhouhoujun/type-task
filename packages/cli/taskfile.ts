import { TaskElement } from '@taskp/core';
import { PipeTask, PipeModule, PipeElement, TsCompile } from '@taskp/pipes';
import { TaskContainer } from '@taskp/platform-server';

import * as mocha from 'gulp-mocha';
const del = require('del');


@PipeTask({
    name: 'test1',
    src: 'test/**/*.spec.ts',
    awaitPiped: true,
    pipes: [() => mocha()],
    children: [
        {
            name: 'tscompLIB',
            src: ['src/**/*.ts', '!src/cli/**'],
            dest: 'lib',
            uglify: true,
            task: TsCompile
        },
        {
            name: 'tscompCLI',
            src: 'src/cli/*.ts',
            dest: 'bin',
            uglify: true,
            task: TsCompile
        }
    ]
})
class BuildTask extends PipeElement {
    constructor() {
        super()
    }
    execute(data?: any): Promise<any> {
        return del(['lib/**', 'bin/**']);
    }
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(BuildTask);
