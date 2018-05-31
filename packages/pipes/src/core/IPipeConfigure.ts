import { IConfigure } from '@taskp/core';
import { TransformMerger, TransformSource, TransformExpress, DestExpress } from './pipeTypes';
import { SrcOptions, DestOptions } from 'vinyl-fs';
import { Token } from '@ts-ioc/core';
import { IPipeComponent } from './IPipeComponent';
import { IPipeTask } from './IPipeTask';

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
     * @type {boolean}
     * @memberof IPipeConfigure
     */
    awaitPiped?: boolean;

    // /**
    //  * merger transform.
    //  *
    //  * @type {TransformMerger}
    //  * @memberof IPipeConfigure
    //  */
    // merger?: TransformMerger;

    // /**
    //  * transform source.
    //  *
    //  * @type {TransformSource}
    //  * @memberof IPipeConfigure
    //  */
    // src?: TransformSource;

    // /**
    //  * watch source change to run pipe task.
    //  *
    //  * @type {(TransformSource | boolean)}
    //  * @memberof IPipeConfigure
    //  */
    // watch?: TransformSource | boolean;
    // /**
    //  * src options.
    //  *
    //  * @type {SrcOptions}
    //  * @memberof IPipeConfigure
    //  */
    // srcOptions?: SrcOptions;
    // /**
    //  * source pipe component task.
    //  *
    //  * @type {Token<IPipeTask>}
    //  * @memberof IPipeConfigure
    //  */
    // srcType?: Token<IPipeTask>;
    // /**
    //  * source merger transform.
    //  *
    //  * @type {TransformMerger}
    //  * @memberof IPipeConfigure
    //  */
    // srcMerger?: TransformMerger;

    // /**
    //  * transform pipes
    //  *
    //  * @type {TransformExpress}
    //  * @memberof IPipeConfigure
    //  */
    // pipes?: TransformExpress;

    // /**
    //  * await piped complete.
    //  *
    //  * @type {boolean}
    //  * @memberof IPipeConfigure
    //  */
    // awaitPiped?: boolean;

    // /**
    //  * pipe dest.
    //  *
    //  * @type {TransformSource}
    //  * @memberof IPipeConfigure
    //  */
    // dest?: TransformSource;
    // /**
    //  * dest transform pipes.
    //  *
    //  * @type {DestExpress}
    //  * @memberof IPipeConfigure
    //  */
    // destPipes?: DestExpress;
    // /**
    //  * dest options.
    //  *
    //  * @type {DestOptions}
    //  * @memberof IPipeConfigure
    //  */
    // destOptions?: DestOptions;
    // /**
    //  * dest pipes component task.
    //  *
    //  * @type {Token<IPipeTask>}
    //  * @memberof IPipeConfigure
    //  */
    // destType?: Token<IPipeTask>;
    // /**
    //  * dest pipe transform merger.
    //  *
    //  * @type {TransformMerger}
    //  * @memberof IPipeConfigure
    //  */
    // destMerger?: TransformMerger;
}
