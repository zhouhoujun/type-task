import { PipeTask } from '../decorators/index';
import { OnTaskInit, Src } from '@taskfr/core';
import { ICleanConfigure } from './IPipeConfigure';
import { Registration } from '@ts-ioc/core';
import { PipeToken, IPipeTask } from '../IPipeTask';
import { AbstractPipe } from './AbstractPipe';
const del = require('del');


/**
 * clean task token.
 */
export const CleanToken = new Registration<IPipeTask>(PipeToken, 'clean');

/**
 * clean task.
 */
@PipeTask(CleanToken)
export class PipeClean extends AbstractPipe implements OnTaskInit {
    clean: Src;
    onTaskInit(config: ICleanConfigure) {
        this.clean = this.context.to(config.clean);
    }

    run(data?: any): Promise<any> {
        return del(this.clean);
    }
}
