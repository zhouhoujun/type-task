import { IPipeComponent, PipeComponent, PipeSource } from '../core/index';
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
export class AssetPipe extends PipeSource implements IAssetPipe {
    constructor(name?: string) {
        super(name);
    }
}
