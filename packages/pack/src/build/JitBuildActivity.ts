import { Task } from '@taskfr/core';
import { BuildActivity, BuildConfigure } from '@taskfr/node';

@Task(<BuildConfigure>{
    name: 'jit-build',
    src: 'src',
    handles: [

    ]
})
export class JitBuildActivity extends BuildActivity {

}
