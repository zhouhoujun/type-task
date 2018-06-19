import { PipeSource, IPipeSource } from '../core/index';
import { AssetTask } from '../decorators/index';



/**
 * source provider.
 *
 * @export
 * @interface IAssetPipe
 * @extends {IPipeComponent}
 */
export interface IAssetPipe extends IPipeSource {

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
export class AssetPipe extends PipeSource implements IAssetPipe {
    constructor(name?: string) {
        super(name);
    }
}
