import { IConfigure, Src, ITaskConfigure, CtxType } from '@taskp/core';
import { TransformMerger, TransformExpress, DestExpress, TransformMergerExpress } from './pipeTypes';
import { SrcOptions, DestOptions } from 'vinyl-fs';
import { Token } from '@ts-ioc/core';
import { IPipeComponent } from './IPipeComponent';
import { IPipeTask } from './IPipeTask';

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
     * await piped complete.
     *
     * @type {CtxType<boolean>}
     * @memberof IPipeConfigure
     */
    awaitPiped?: CtxType<boolean>;

    /**
     * streams merger.
     *
     * @type {TransformMergerExpress}
     * @memberof IPipeConfigure
     */
    merger?: TransformMergerExpress

}

/**
 * source pipe configure.
 *
 * @export
 * @interface IPipeSourceConfigure
 * @extends {IPipeConfigure}
 */
export interface IPipeSourceConfigure extends IPipeConfigure {

    /**
     * transform source.
     *
     * @type {TransformSource}
     * @memberof IPipeConfigure
     */
    src?: CtxType<Src>;

    /**
     * src options.
     *
     * @type {CtxType<SrcOptions>}
     * @memberof IPipeConfigure
     */
    srcOptions?: CtxType<SrcOptions>;

    /**
     * watch source change to run pipe task.
     *
     * @type {CtxType<Src | boolean>}
     * @memberof IPipeConfigure
     */
    watch?: CtxType<Src | boolean>;

}

/**
 * dest pipe configure.
 *
 * @export
 * @interface IPipeDestConfigure
 * @extends {IPipeConfigure}
 */
export interface IPipeDestConfigure extends IPipeConfigure {

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
