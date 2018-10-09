import { Task } from '@taskfr/core';
import { BuildActivity, BuildConfigure } from '@taskfr/node';

@Task(<BuildConfigure>{
    name: 'dev-build',
    src: 'src',
    handles: [
        {
            test: '*.ts',
            compiler: 'tsc'
        }
    ]
})
export class DevBuildActivity extends BuildActivity {

}
