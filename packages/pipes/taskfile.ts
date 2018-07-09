import { PipeModule, Package, PipeElement } from 'src';
import { TaskContainer } from '@taskfr/platform-server';

@Package({
    src: 'src',
    clean: 'lib',
    test: 'test/**/*.spec.ts',
    assets: {
        ts: { dest: 'lib', uglify: true, task: 'ts' }
    }
})
export class Builder extends PipeElement {
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(Builder);
