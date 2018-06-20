import { PipeSource } from '../core/index';
import { AssetTask } from '../decorators/index';
import { IAssetPipe } from './IAssetPipe';

/**
 * pipe component
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@AssetTask
export class AssetPipe extends PipeSource implements IAssetPipe {
    constructor(name?: string) {
        super(name);
    }
}
