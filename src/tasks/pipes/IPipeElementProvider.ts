import { ITaskProvider } from '../../core/index';
import { TransformSource, TransformExpress, DestExpress, TransformMerger, TransformReference } from './pipeTypes';
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
     * bind reference.
     *
     * @type {TransformReference}
     * @memberof IPipeElementProvider
     */
    reference?: TransformReference;

    /**
     * transform source.
     *
     * @type {TransformSource}
     * @memberof IPipeElementProvider
     */
    src?: TransformSource;
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
     * source reference transform.
     *
     * @type {TransformReference}
     * @memberof IPipeElementProvider
     */
    srcReference?: TransformReference;

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
     * pipes reference transform.
     *
     * @type {TransformReference}
     * @memberof IPipeElementProvider
     */
    pipesReference?: TransformReference;
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
    /**
     * dest pipe reference merger.
     *
     * @type {TransformReference}
     * @memberof IPipeElementProvider
     */
    destReference?: TransformReference;
}
