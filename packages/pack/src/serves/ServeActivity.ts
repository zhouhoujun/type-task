import { Task } from '@taskfr/core';
import { BuildConfigure, BuildActivity } from '@taskfr/node';

@Task(<BuildConfigure>{
    name: 'dev-build',
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
export class ServeActivity extends BuildActivity {

}
