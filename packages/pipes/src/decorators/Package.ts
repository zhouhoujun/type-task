import { ITaskDecorator, createTaskDecorator, ActivityBuilderToken } from '@taskfr/core';
import { PackageConfigure, PackageBuilderToken, PackageToken } from '../core/PackageConfigure';

/**
 * asset task metadata.
 *
 * @export
 * @interface PackageMetadata
 * @extends {PackageConfigure}
 */
export interface PackageMetadata extends PackageConfigure {

}

/**
 * package task decorator, use to define class is a asset task element.
 *
 * @Package
 */
export const Package: ITaskDecorator<PackageMetadata> = createTaskDecorator<PackageMetadata>('Package', ActivityBuilderToken, PackageBuilderToken, PackageBuilderToken, PackageToken);
