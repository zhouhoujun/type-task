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
    merger?: TransformMerger;
    reference?: TransformReference;

    src?: TransformSource;
    srcOptions?: SrcOptions;
    srcType?: Type<IPipeComponent>;
    srcMerger?: TransformMerger;
    srcReference?: TransformReference;

    pipes?: TransformExpress;
    pipesType?: Type<IPipeComponent>;
    pipesMerger?: TransformMerger;
    pipesReference?: TransformReference;
    awaitPiped?: boolean;

    dest?: TransformSource;
    destPipes?: DestExpress;
    destOptions?: DestOptions;
    destType?: Type<IPipeComponent>;
    destMerger?: TransformMerger;
    destReference?: TransformReference;
}
