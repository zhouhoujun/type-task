import { PipeTask } from '../decorators';
import { OnTaskInit, Src } from '@taskfr/core';
import { ICleanConfigure } from './IPipeConfigure';
import { Registration } from '@ts-ioc/core';
import { PipeToken, IPipeActivity } from '../IPipeTask';
import { PipeActivity } from './PipeActivity';
const del = require('del');


/**
 * clean task token.
 */
export const CleanToken = new Registration<IPipeActivity>(PipeToken, 'clean');

/**
 * clean task.
 */
@PipeTask(CleanToken)
export class PipeClean extends PipeActivity implements OnTaskInit {
    clean: Src;
    onTaskInit(config: ICleanConfigure) {
        this.clean = this.context.to(config.clean);
    }

    run(data?: any): Promise<any> {
        return del(this.clean);
    }
}
