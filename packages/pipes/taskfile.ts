import { PipeModule, Package } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';

@Package({
    src: 'src',
    clean: 'lib',
    test: 'test/**/*.spec.ts',
    assets: {
        ts: { dest: 'lib', uglify: true, annotation: true }
    }
})
export class Builder {
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(Builder);
