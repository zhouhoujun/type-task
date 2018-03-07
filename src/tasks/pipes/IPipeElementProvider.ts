import { ITaskProvider } from '../../core/index';
import { TaskSource, StreamExpress, DestExpress } from './pipeTypes';
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
    src?: TaskSource<ITaskContext>;
    srcOptions?: SrcOptions;
    srcType?: Type<IPipeComponent<Src>>;

    pipes?: StreamExpress<ITaskContext, ITransform>;
    pipesType?:  Type<IPipeComponent<ITransform>>;
    awaitPiped?: boolean;

    dest?: TaskSource<ITaskContext>;
    destOptions?: DestOptions;
    destType?: Type<IPipeComponent<Src>>;
    destPipes?: DestExpress<ITaskContext, ITransform>;
}
