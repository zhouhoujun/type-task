import { ITaskDecorator, createTaskDecorator, TaskBuilderToken } from '@taskp/core';
import { IAssetConfigure } from '../assets/IAssetConfigure';
import { Registration } from '@ts-ioc/core';
import { AssetToken } from '../assets/IAssetPipe';

/**
 * asset task metadata.
 *
 * @export
 * @interface PackageMetadata
 * @extends {IAssetConfigure}
 */
export interface PackageMetadata extends IAssetConfigure {

}

/**
 * package task decorator, use to define class is a asset task element.
 *
 * @Package
 */
export const Package: ITaskDecorator<PackageMetadata> = createTaskDecorator<PackageMetadata>('Package', new Registration(TaskBuilderToken, 'package'), AssetToken);
