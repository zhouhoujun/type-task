import { PipeModule, Package, PipeElement } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';

@Package({
    src: 'src',
    clean: 'lib',
    test: 'test/**/*.spec.ts',
    assets: {
        ts: { dest: 'lib', annotation: true, uglify: true }
    }
})
export class Builder extends PipeElement {
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(Builder);
