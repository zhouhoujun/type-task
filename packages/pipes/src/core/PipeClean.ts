import { PipeTask } from '../decorators/index';
import { OnTaskInit, Src } from '@taskfr/core';
import { ICleanConfigure } from './IPipeConfigure';
import { Registration } from '@ts-ioc/core';
import { PipeToken, IPipeTask } from './IPipeTask';
import { AbstractPipe } from './AbstractPipe';
const del = require('del');



export const CleanToken = new Registration<IPipeTask>(PipeToken, 'clean');

@PipeTask(CleanToken)
export class PipeClean extends AbstractPipe implements OnTaskInit {
    cleanSrc: Src;
    onTaskInit(config: ICleanConfigure) {
        this.cleanSrc = this.context.to(config.clean);
    }

    run(data?: any): Promise<any> {
        return del(this.cleanSrc);
    }
}
