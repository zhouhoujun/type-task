import { PipeModule, TsCompile, AssetTask, PipeElement } from '@taskp/pipes';
import { TaskContainer } from '@taskp/platform-server';

import * as mocha from 'gulp-mocha';
import { AssetPipe } from '../pipes/src/assets';
const del = require('del');


@AssetTask({
    children: [{
        name: 'tsAssets',
        src: 'src/**/*.ts',
        // test: 'test/**/*.spec.ts',
        dest: 'bin',
        uglify: true,
        task: TsCompile
    }]
})
class BuildTask extends PipeElement {
    constructor() {
        super()
        this.awaitPiped = true;
    }
    execute(data?: any): Promise<any> {
        console.log('execute del');
        return del(['lib/**', 'bin/**']);
    }
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(BuildTask);
