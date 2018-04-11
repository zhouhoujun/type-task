import { Task, TaskElement } from '../../core/index';
import { ITransform } from './ITransform';
import { RunWay } from '../../core/index';
import { TransformSource, TransformExpress, DestExpress, TransformMerger } from './pipeTypes';
import { ITaskContext } from '../../ITaskContext';
import { Type, isBoolean } from '@ts-ioc/core';
import { IPipeComponent } from './IPipeComponent';
import { Src } from '../../utils/index';
import { SrcOptions, DestOptions } from 'vinyl-fs';
import { PipeComponent } from './PipeComponent';

/**
 * pipe component
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@Task
export class PipeElement extends PipeComponent<IPipeComponent> implements IPipeComponent {
    private watch?: TransformSource;

    constructor(
        name: string,
        runWay = RunWay.seqFirst,
        merger?: TransformMerger,

        private src?: TransformSource,
        private srcOptions?: SrcOptions,
        private srcType?: Type<IPipeComponent>,
        private srcMerger?: TransformMerger,
        watch?: TransformSource | boolean,

        private pipes?: TransformExpress,
        private pipesType?: Type<IPipeComponent>,
        private pipesMerger?: TransformMerger,
        private awaitPiped?: boolean,

        private dest?: TransformSource,
        private destPipes?: DestExpress,
        private destOptions?: DestOptions,
        private destType?: Type<IPipeComponent>,
        private destMerger?: TransformMerger
    ) {
        super(name, runWay, merger);
        if (watch) {
            this.watch = isBoolean(watch) ? src : watch;
        }
    }

    onInit() {
        let container = this.context.container;
        if (this.src) {
            this.add(container.resolve<IPipeComponent>(
                this.srcType || 'PipeSource',
                { name: `${this.name}-src`, src: this.src, options: this.srcOptions, merger: this.srcMerger }));
        }
        if (this.pipes) {
            this.add(container.resolve<IPipeComponent>(
                this.pipesType || 'PipeStream',
                { name: `${this.name}-pipes`, pipes: this.pipes, awaitPiped: !!this.awaitPiped, merger: this.pipesMerger }))
        }

        if (this.dest) {
            this.add(container.resolve<IPipeComponent>(
                this.destType || 'PipeDest',
                { name: `${this.name}-dest`, dest: this.dest, destPipes: this.destPipes, options: this.destOptions, merger: this.destMerger }))
        }
    }

    protected pipe(data: ITransform): Promise<ITransform> {
        return Promise.resolve(data);
    }
}
