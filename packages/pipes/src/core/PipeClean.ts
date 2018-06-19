import { PipeElement } from './PipeElement';
import { PipeTask } from '../decorators/index';
import { OnTaskInit, Src } from '@taskp/core';
import { ICleanConfigure } from './IPipeConfigure';
const del = require('del');

@PipeTask
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
