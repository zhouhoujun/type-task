import { ITaskDecorator, createTaskDecorator, TaskBuilderToken } from '@taskp/core';
import { IAssetConfigure } from '../assets/IAssetConfigure';
import { Registration } from '@ts-ioc/core';
import { AssetToken } from '../assets/IAssetPipe';

/**
 * asset task metadata.
 *
 * @export
 * @interface PackagerMetadata
 * @extends {IAssetConfigure}
 */
export interface PackagerMetadata extends IAssetConfigure {

}

/**
 * Asset task decorator, use to define class is a asset task element.
 *
 * @Package
 */
export const Packager: ITaskDecorator<PackagerMetadata> = createTaskDecorator<PackagerMetadata>('Packager', new Registration(TaskBuilderToken, 'package'), AssetToken);
