import { ActivityConfigure } from '@taskfr/core';
import { TransformExpress, TransformConfig } from './pipeTypes';

/**
 * pipe configure.
 *
 * @export
 * @interface IPipeConfigure
 * @extends {ActivityConfigure}
 */
export interface IPipeConfigure extends ActivityConfigure {
    /**
     * transform pipes
     *
     * @type {TransformExpress}
     * @memberof IPipeConfigure
     */
    pipes?: TransformExpress;
}
