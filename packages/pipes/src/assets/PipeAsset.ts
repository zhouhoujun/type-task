import { PipeSource } from '../core';
import { AssetTask } from '../decorators';
import { IAsset } from './IAsset';

/**
 * pipe component
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@AssetTask
export class PipeAsset extends PipeSource implements IAsset {
    constructor(name?: string) {
        super(name);
    }
}
