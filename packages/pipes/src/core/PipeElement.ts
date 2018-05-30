import { Task, Src, TaskElement, RunWay } from '@taskp/core';
import { ITransform } from './ITransform';
import { TransformSource, TransformExpress, DestExpress, TransformMerger } from './pipeTypes';
import { Type, isBoolean, isFunction, Mode } from '@ts-ioc/core';
import { IPipeComponent } from './IPipeComponent';
import { SrcOptions, DestOptions, watch } from 'vinyl-fs';
import { PipeComponent } from './PipeComponent';
import { IPipeElement } from './IPipeElement';

/**
 * pipe component
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@Task
export class PipeElement extends PipeComponent<IPipeComponent> implements IPipeElement {

    public watchSrc?: TransformSource;

    constructor(
        name: string,
        runWay = RunWay.seqFirst,
        merger?: TransformMerger,

        public src?: TransformSource,
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
            this.watchSrc = isBoolean(watch) ? src : watch;
        }
    }

    onInit() {
        let container = this.container;
        if (this.watchSrc) {
            this.watch(this.watchSrc);
        }
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

    run(data?: Src | ITransform | ITransform[]): Promise<ITransform> {
        return super.run(data)
            .then(rd => {
                return rd as ITransform;
            });
    }

    watch(src?: TransformSource) {
        src = src || this.src;
        let watchSrc = isFunction(src) ? src(this.context, this.getConfig()) : src;
        watch(watchSrc, () => {
            this.run(watchSrc);
        });
    }

    protected pipe(data: ITransform): Promise<ITransform> {
        return Promise.resolve(data);
    }
}
