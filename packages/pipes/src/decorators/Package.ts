import { ITaskDecorator, createTaskDecorator } from '@taskfr/core';
import { AssetToken } from '../assets/IAsset';
import { IPackageConfigure } from '../assets/IPackageConfigure';
import { PackageBuilderToken } from '../core/IPipeActivity';

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
export const Package: ITaskDecorator<PackageMetadata> = createTaskDecorator<PackageMetadata>('Package', PackageBuilderToken, AssetToken);
