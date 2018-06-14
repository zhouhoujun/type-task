import { IPipeComponent, PipeComponent } from '../core/index';
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
