import { Task } from '@taskfr/core';
import { BuildActivity } from '@taskfr/node';


@Task('prod-build')
export class NgProdBuildActivity extends BuildActivity {

}
