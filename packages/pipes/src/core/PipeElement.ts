import { Task, Src, TaskElement, RunWay } from '@taskp/core';
import { IPipeComponent, PipeComponent, ITransform, TransformExpress, DestExpress, TransformMerger } from '../core/index';
import { Type, isBoolean, isFunction, Mode } from '@ts-ioc/core';
import { SrcOptions, DestOptions, watch } from 'vinyl-fs';
import { IPipeDest } from './PipeDest';
import { IPipeSource } from './PipeSource';



/**
 * source provider.
 *
 * @export
 * @interface IPipeElement
 * @extends {IPipeComponent}
 */
export interface IPipeElement extends IPipeComponent { // , IPipeSource, IPipeDest {

    /**
     * watch source change to run pipe task.
     *
     * @type {(Src | boolean)}
     * @memberof IPipeConfigure
     */
    watch?: Src | boolean;
}


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


    watch?: Src | boolean;

    src?: Src;
    srcOptions?: SrcOptions;
    srcType?: Type<IPipeComponent>;
    srcMerger?: TransformMerger;

    dest?: Src;
    destPipes?: DestExpress;
    destOptions?: DestOptions;
    destType?: Type<IPipeComponent>;
    destMerger?: TransformMerger;

    constructor(name?: string) {
        super(name);

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

    watchSrc(src?: TransformSource) {
        src = src || this.src;
        let watchSrc = isFunction(src) ? src(this.context, this.config) : src;
        watch(watchSrc, () => {
            this.run(watchSrc);
        });
    }

    protected pipe(data: ITransform): Promise<ITransform> {
        return Promise.resolve(data);
    }
}
