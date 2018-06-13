import { Src } from '@taskp/core';
import { IPipeComponent, PipeComponent, DestExpress, TransformMerger, IPipeSource, IPipeDest } from '../core/index';
import { Type } from '@ts-ioc/core';
import { SrcOptions, DestOptions } from 'vinyl-fs';
import { AssetTask } from '../decorators/index';



/**
 * source provider.
 *
 * @export
 * @interface IAssetPipe
 * @extends {IPipeComponent}
 */
export interface IAssetPipe extends IPipeComponent {

}


/**
 * pipe component
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@AssetTask
export class AssetPipe extends PipeComponent<IAssetPipe> implements IAssetPipe {
    constructor(name?: string) {
        super(name);

    }
}
