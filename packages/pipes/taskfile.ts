import { PipeModule, PackageTask } from '@taskp/pipes';
import { TaskContainer } from '@taskp/platform-server';

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(
        {
            src: 'src',
            // test: 'test/**/*.spec.ts',
            clean: 'lib',
            assets: {
                ts: {
                    // src: 'src/**/*.ts',
                    dest: 'lib',
                    uglify: true
                }
            },
            task: PackageTask
        });
