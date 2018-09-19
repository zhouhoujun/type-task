import { Task } from '@taskfr/core';
import { BuildActivity, BuildConfigure } from '@taskfr/node';

@Task(<BuildConfigure>{
    src: 'src',
    handles: [
        {
            filter: '*.scss',
            compiler: 'scss'
        },
        {
            filter: '*.ts',
            compiler: 'ngc'
        }
    ]
})
export class DevBuildActivity extends BuildActivity {

}
