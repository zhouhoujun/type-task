import { ITaskDecorator, createTaskDecorator, ActivityBuilderToken } from '@taskfr/core';
import { AssetConfigure } from '../core/AssetConfigure';
import { AssetBuilderToken, AssetToken } from '../core/AssetConfigure';

/**
 * asset task metadata.
 *
 * @export
 * @interface AssetTaskMetadata
 * @extends {AssetConfigure}
 */
export interface AssetTaskMetadata extends AssetConfigure {

}

/**
 * Asset task decorator, use to define class is a asset task element.
 *
 * @AssetTask
 */
export const AssetTask: ITaskDecorator<AssetTaskMetadata> = createTaskDecorator<AssetTaskMetadata>('AssetTask', ActivityBuilderToken, AssetBuilderToken, AssetBuilderToken, AssetToken);
