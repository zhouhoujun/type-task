import { ITaskProvider } from '../../core/index';
import { TransformSource, TransformExpress, DestExpress, TransformMerger } from './pipeTypes';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { Type } from 'tsioc';
import { Src } from '../../utils/index';
import { ITaskContext } from '../../ITaskContext';
import { SrcOptions, DestOptions } from 'vinyl-fs';

/**
 * pipe task provider.
 *
 * @export
 * @interface IPipeTaskProvider
 * @extends {ITaskProvider}
 */
export interface IPipeElementProvider extends ITaskProvider {
    /**
     * merger transform.
     *
     * @type {TransformMerger}
     * @memberof IPipeElementProvider
     */
    merger?: TransformMerger;

    /**
     * transform source.
     *
     * @type {TransformSource}
     * @memberof IPipeElementProvider
     */
    src?: TransformSource;

    /**
     * watch source change to run pipe task.
     *
     * @type {(TransformSource | boolean)}
     * @memberof IPipeElementProvider
     */
    watch?: TransformSource | boolean;
    /**
     * src options.
     *
     * @type {SrcOptions}
     * @memberof IPipeElementProvider
     */
    srcOptions?: SrcOptions;
    /**
     * source pipe component task.
     *
     * @type {Type<IPipeComponent>}
     * @memberof IPipeElementProvider
     */
    srcType?: Type<IPipeComponent>;
    /**
     * source merger transform.
     *
     * @type {TransformMerger}
     * @memberof IPipeElementProvider
     */
    srcMerger?: TransformMerger;

    /**
     * transform pipes
     *
     * @type {TransformExpress}
     * @memberof IPipeElementProvider
     */
    pipes?: TransformExpress;
    /**
     * trans pipes component task.
     *
     * @type {Type<IPipeComponent>}
     * @memberof IPipeElementProvider
     */
    pipesType?: Type<IPipeComponent>;
    /**
     * pipes merger transform.
     *
     * @type {TransformMerger}
     * @memberof IPipeElementProvider
     */
    pipesMerger?: TransformMerger;

    /**
     * await piped complete.
     *
     * @type {boolean}
     * @memberof IPipeElementProvider
     */
    awaitPiped?: boolean;

    /**
     * pipe dest.
     *
     * @type {TransformSource}
     * @memberof IPipeElementProvider
     */
    dest?: TransformSource;
    /**
     * dest transform pipes.
     *
     * @type {DestExpress}
     * @memberof IPipeElementProvider
     */
    destPipes?: DestExpress;
    /**
     * dest options.
     *
     * @type {DestOptions}
     * @memberof IPipeElementProvider
     */
    destOptions?: DestOptions;
    /**
     * dest pipes component task.
     *
     * @type {Type<IPipeComponent>}
     * @memberof IPipeElementProvider
     */
    destType?: Type<IPipeComponent>;
    /**
     * dest pipe transform merger.
     *
     * @type {TransformMerger}
     * @memberof IPipeElementProvider
     */
    destMerger?: TransformMerger;
}
