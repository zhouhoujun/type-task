import * as fs from 'fs';
import * as path from 'path'
import { Task } from '@taskfr/core';
import { CompilerActivity, CompilerActivityContext } from '@taskfr/node';
import { mkdir } from 'shelljs';



/**
 * SassBuilder activity.
 *
 * @export
 * @class SassBuilderActivity
 * @extends {BuildActivity}
 */
@Task('sass')
export class SassBuilderActivity extends CompilerActivity {

    constructor() {
        super();
    }

    protected async execute(ctx: CompilerActivityContext): Promise<void> {
        let dist = path.join(ctx.builder.dist, ctx.handle.subDist);
        if (fs.existsSync(dist)) {
            mkdir('-p', dist);
        }
    }
}
