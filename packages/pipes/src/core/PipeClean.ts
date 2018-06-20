import { PipeElement } from './PipeElement';
import { PipeTask } from '../decorators/index';
import { OnTaskInit, Src } from '@taskp/core';
import { ICleanConfigure } from './IPipeConfigure';
import { Registration } from '@ts-ioc/core';
import { PipeToken } from './IPipeTask';
const del = require('del');



export const CleanToken = new Registration(PipeToken, 'clean');

@PipeTask(CleanToken)
export class PipeClean extends PipeElement implements OnTaskInit {
    awaitPiped = true;
    cleanSrc: Src;
    onTaskInit(config: ICleanConfigure) {
        super.onTaskInit(config);
        this.awaitPiped = true;
        this.cleanSrc = this.context.to(config.clean);
        this.pipes = this.pipes || [];
        this.pipes.push(() => del(this.cleanSrc));
    }
}
