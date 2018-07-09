import { ITaskDecorator, createTaskDecorator } from '@taskfr/core';
import { IAssetConfigure } from '../assets/IAssetConfigure';
import { AssetToken } from '../assets/IAsset';
import { AssetTaskBuilderToken } from '../IPipeTask';

/**
 * asset task metadata.
 *
 * @export
 * @interface AssetTaskMetadata
 * @extends {IAssetConfigure}
 */
export interface AssetTaskMetadata extends IAssetConfigure {

}

/**
 * Asset task decorator, use to define class is a asset task element.
 *
 * @AssetTask
 */
export const AssetTask: ITaskDecorator<AssetTaskMetadata> = createTaskDecorator<AssetTaskMetadata>('AssetTask', AssetTaskBuilderToken, AssetToken);
