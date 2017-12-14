import { DefaultPipeTask } from './PipeTask';
import { RunWay } from '../RunWay';
import { ExecOptions } from 'child_process';
import { ITask, ITaskInfo } from '../ITask';
import { AsyncTaskSource, AsyncSrc, Pipe, OutputPipe } from '../types';
import { ITaskContext } from '../ITaskContext';
import { IAssets } from '../IAssets';
import { ITransform } from '../ITransform';
import { IPipe } from '../IPipe';
import { IOutputPipe } from '../IOutputPipe';
import { isFunction } from 'tsioc';


/**
 * pipe task for dynamic task.
 *
 * @class DynamicPipeTask
 * @extends {PipeTask}
 */
export class DynamicPipeTask extends DefaultPipeTask {
    constructor(private assets: IAssets) {
        super();
    }

    protected getOption(ctx: ITaskContext): IAssets {
        return this.dt || ctx.option;
    }

    protected customPipe(source: ITransform, ctx: ITaskContext, dist: IAssets) {
        if (this.dt.pipe) {
            return Promise.resolve(super.customPipe(source, ctx, dist))
                .then(stream => this.cpipe2Promise(stream, this.dt, ctx, dist));
        } else {
            return super.customPipe(source, ctx, dist);
        }
    }

    pipes(ctx: ITaskContext, dist: IAssets): Pipe[] {
        let pipes = isFunction(this.dt.pipes) ? this.dt.pipes(ctx, dist) : this.dt.pipes;
        pipes = pipes || [];
        return pipes.concat(super.pipes(ctx, dist));
    }

    output(ctx: ITaskContext, dist: IAssets): OutputPipe[] {
        if (this.dt.output === null) {
            return [stream => stream];
        }
        let outputs = isFunction(this.dt.output) ? this.dt.output(ctx, dist) : this.dt.output;
        outputs = outputs || [];
        return outputs.concat(super.output(ctx, dist));
    }

}
