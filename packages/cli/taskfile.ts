import { PipeModule, Package } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';

@Package({
    test: 'test/**/*.spec.ts',
    clean: 'bin',
    assets: {
        ts: {
            name: 'tscompile',
            src: 'src/**/*.ts',
            dest: 'bin',
            tsconfig: './tsconfig.es2015.json',
            uglify: false
        }
    }
})
class BuildTask {
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(BuildTask);
