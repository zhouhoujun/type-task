import * as fs from 'fs';
import * as path from 'path'
import { Task } from '@taskfr/core';
import { mkdir } from 'shelljs';
import { CompilerActivity } from '../CompilerActivity';
import { CompilerActivityContext } from '../CompilerActivityContext';



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
