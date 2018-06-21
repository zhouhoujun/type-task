import { ITaskDecorator, createTaskDecorator, TaskBuilderToken } from '@taskp/core';
import { Registration } from '@ts-ioc/core';
import { AssetToken } from '../assets/IAssetPipe';
import { IPackageConfigure } from '../assets/IPackageConfigure';

/**
 * asset task metadata.
 *
 * @export
 * @interface PackageMetadata
 * @extends {IPackageConfigure}
 */
export interface PackageMetadata extends IPackageConfigure {

}

/**
 * package task decorator, use to define class is a asset task element.
 *
 * @Package
 */
export const Package: ITaskDecorator<PackageMetadata> = createTaskDecorator<PackageMetadata>('Package', new Registration(TaskBuilderToken, 'package'), AssetToken);
