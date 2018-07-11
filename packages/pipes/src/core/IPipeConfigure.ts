import { IConfigure, Src, CtxType } from '@taskfr/core';
import { TransformExpress, TransformMergerExpress, TransformType } from './pipeTypes';
import { SrcOptions, DestOptions } from 'vinyl-fs';

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
    merger?: TransformMergerExpress
}


/**
 * dest pipe configure.
 *
 * @export
 * @interface IPipeDestConfigure
 * @extends {IPipeConfigure}
 */
export interface IDestConfigure extends IPipeConfigure {

    /**
     * pipe dest.
     *
     * @type {CtxType<string>}
     * @memberof IPipeConfigure
     */
    dest?: CtxType<string>;

    /**
     * dest options.
     *
     * @type {CtxType<DestOptions>}
     * @memberof IPipeConfigure
     */
    destOptions?: CtxType<DestOptions>;

}

/**
 * clean configure
 *
 * @export
 * @interface ICleanConfigure
 * @extends {IConfigure}
 */
export interface ICleanConfigure extends IConfigure {
    /**
     * clean match.
     *
     * @type {CtxType<Src>}
     * @memberof ICleanConfigure
     */
    clean?: CtxType<Src>;
}
