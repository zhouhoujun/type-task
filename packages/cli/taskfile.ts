import { PipeModule, PipeElement, Package } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';

@Package({
    test: 'test/**/*.spec.ts',
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
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(BuildTask);
