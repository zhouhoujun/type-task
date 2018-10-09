import { Task } from '@taskfr/core';
import { BuildActivity, BuildConfigure } from '@taskfr/node';

@Task(<BuildConfigure>{
    name: 'ng-jit',
    src: 'src',
    handles: [
        {
            test: '*.scss',
            compiler: 'scss'
        },
        {
            test: '*.ts',
            compiler: 'ngc'
        }
    ]
})
export class NgJitBuildActivity extends BuildActivity {

}
