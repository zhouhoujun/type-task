import { IConfigure } from '@taskfr/core';
import { TransformExpress, TransformConfig } from './pipeTypes';

/**
 * pipe configure.
 *
 * @export
 * @interface IPipeConfigure
 * @extends {IConfigure}
 */
export interface IPipeConfigure extends IConfigure {
    /**
     * transform pipes
     *
     * @type {TransformExpress}
     * @memberof IPipeConfigure
     */
    pipes?: TransformExpress;

    /**
     * streams merger.
     *
     * @type {TransformMergerExpress}
     * @memberof IPipeConfigure
     */
    merger?: TransformConfig;
}
