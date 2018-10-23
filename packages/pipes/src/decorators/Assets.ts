import { ITaskDecorator, createTaskDecorator } from '@taskfr/core';
import { AssetConfigure } from '../core/AssetConfigure';
import { AssetBuilderToken, AssetToken } from '../core/IAssetActivity';

/**
 * asset task metadata.
 *
 * @export
 * @interface AssetTaskMetadata
 * @extends {AssetConfigure}
 */
export interface AssetsMetadata extends AssetConfigure {

}

/**
 * Asset task decorator, use to define class is a asset task element.
 *
 * @AssetTask
 */
export const Assets: ITaskDecorator<AssetsMetadata> = createTaskDecorator<AssetsMetadata>('Assets', AssetBuilderToken, AssetToken);

