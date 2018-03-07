import { Task, TaskElement } from '../../core/index';
import { ITransform } from './ITransform';
import { RunWay } from '../../core/index';
import { TaskSource, StreamExpress, DestExpress } from './pipeTypes';
import { ITaskContext } from '../../ITaskContext';
import { Type } from 'tsioc';
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
export class PipeElement extends PipeComponent<IPipeComponent<any>> implements IPipeComponent<any> {
    constructor(
        name: string,
        runWay = RunWay.seqFirst,
        private src?: TaskSource<ITaskContext>,
        private srcOptions?: SrcOptions,
        private srcType?: Type<IPipeComponent<Src>>,

        private pipes?: StreamExpress<ITaskContext, ITransform>,
        private pipesType?: Type<IPipeComponent<ITransform>>,
        private awaitPiped?: boolean,

        private dest?: TaskSource<ITaskContext>,
        private destPipes?: DestExpress<ITaskContext, ITransform>,
        private destOptions?: DestOptions,
        private destType?: Type<IPipeComponent<Src>>
    ) {
        super(name, runWay);
    }

    onInit() {
        let container = this.context.container;
        if (this.src) {
            this.add(container.resolve<IPipeComponent<Src>>(this.srcType || 'PipeSource', { name: `${this.name}-src`, src: this.src, options: this.srcOptions }));
        }
        if (this.pipes) {
            this.add(container.resolve<IPipeComponent<ITransform>>(this.pipesType || 'PipeStream', { name: `${this.name}-pipes`, pipes: this.pipes, awaitPiped: !!this.awaitPiped }))
        }

        if (this.dest) {
            this.add(container.resolve<IPipeComponent<ITransform>>(this.destType || 'PipeDest', { name: `${this.name}-dest`, dest: this.dest, destPipes: this.destPipes, options: this.destOptions }))
        }
    }

    protected execute(data: any): Promise<ITransform> {
        return Promise.resolve(data);
    }
}
