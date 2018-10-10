import { Task } from '@taskfr/core';
import { BuildActivity, BuildConfigure } from '@taskfr/node';
import { PackActivity } from '../../core';

/**
 * dev build activity.
 *
 * @export
 * @class DevBuildActivity
 * @extends {BuildActivity}
 */
@Task(<BuildConfigure>{
    name: 'ng-dev',
    clean: 'dist',
    src: 'src',
    dist: 'dist',
    handles: [
        {
            test: '*.scss',
            compiler: 'scss'
        },
        {
            test: '*.less',
            compiler: 'less'
        },
        {
            test: '*.ts',
            compiler: 'ngc'
        }
    ]
})
export class NgDevBuildActivity extends PackActivity {

}
