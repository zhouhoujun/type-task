import { ITaskDecorator, createTaskDecorator, TaskBuilderToken } from '@taskfr/core';
import { IAssetConfigure } from '../assets/IAssetConfigure';
import { Registration } from '@ts-ioc/core';
import { AssetToken } from '../assets/IAssetPipe';

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
export const AssetTask: ITaskDecorator<AssetTaskMetadata> = createTaskDecorator<AssetTaskMetadata>('AssetTask', new Registration(TaskBuilderToken, 'Asset'), AssetToken);
