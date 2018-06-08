import { ITaskDecorator, createTaskDecorator } from '@taskp/core';
import { IAssetConfigure } from '../core/IPipeConfigure';

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
export const AssetTask: ITaskDecorator<AssetTaskMetadata> = createTaskDecorator<AssetTaskMetadata>('AssetTask');
