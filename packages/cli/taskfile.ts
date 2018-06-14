import { PipeModule, TsCompile, AssetTask, PipeElement } from '@taskp/pipes';
import { TaskContainer } from '@taskp/platform-server';

import * as mocha from 'gulp-mocha';
import { AssetPipe } from '../pipes/src/assets';
const del = require('del');


@AssetTask({
    name: 'test1',
    test: {
        test: 'test/**/*.spec.ts',
        pipes: [() => mocha()],
        awaitPiped: true,
    },
    children: [
        {
            name: 'tscompCLI',
            src: 'src/**/*.ts',
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
