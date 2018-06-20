import { PipeModule, PipeElement, Packager } from '@taskp/pipes';
import { TaskContainer } from '@taskp/platform-server';
const del = require('del');


// @AssetTask({
//     children: [{
//         name: 'tsAssets',
//         src: 'src/**/*.ts',
//         // test: 'test/**/*.spec.ts',
//         dest: 'bin',
//         uglify: true,
//         task: TsCompile
//     }]
// })
// class BuildTask extends PipeElement {
//     constructor() {
//         super()
//         this.awaitPiped = true;
//     }
//     execute(data?: any): Promise<any> {
//         console.log('execute del');
//         return del(['lib/**', 'bin/**']);
//     }
// }

@Packager({
    // test: 'test/**/*.spec.ts',
    clean: 'bin',
    assets: {
        ts: {
            name: 'tscompile',
            src: 'src/**/*.ts',
            dest: 'bin',
            uglify: true
        }
    }
})
class BuildTask extends PipeElement {
    constructor() {
        super()
    }
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(BuildTask);
