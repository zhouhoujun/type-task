import { Src, ExpressionToken, ConfigureType, IActivity, CtxType, SequenceConfigure, ISequenceConfigure } from '@taskfr/core';
import { ObjectMap, Token } from '@ts-ioc/core';
import { BuildConfigure, TestConfigure, CleanConfigure, CleanActivity, TestActivity, BuildConfigures, WatchActivity, WatchConfigure } from '@taskfr/build';
import { ServeActivity, ServeConfigure } from '../serves';

/**
 * pack configure.
 */
export type PackConfigures<T> = PackConfigure | BuildConfigures<T>;

/**
 * pack activity type, configy.
 */
export type PackActivityType<T extends IActivity> = Token<T> | PackConfigures<T>;

/**
 * pack configure.
 *
 * @export
 * @interface PackConfigure
 * @extends {ActivityConfigure}
 */
export interface PackConfigure extends BuildConfigure {

    /**
     * src root path.
     *
     * @type {CtxType<string>}
     * @memberof PackageConfigure
     */
    src?: CtxType<string>;

    /**
     * clean task config.
     *
     * @type {(ExpressionToken<Src> | ConfigureType<CleanActivity, CleanConfigure>)}
     * @memberof PackConfigure
     */
    clean?: ExpressionToken<Src> | ConfigureType<CleanActivity, CleanConfigure>;

    /**
     * assets.
     *
     * @type {ObjectMap<ExpressionToken<Src> | PackConfigures<PackActivityType<IActivity>>>}
     * @memberof PackConfigure
     */
    assets?: ObjectMap<ExpressionToken<Src> | PackConfigures<PackActivityType<IActivity>>>;

    /**
     * test config.
     *
     * @type {(ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>)}
     * @memberof PackConfigure
     */
    test?: ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>;

    /**
     * serve task config.
     *
     * @type {(ExpressionToken<Src> | ConfigureType<ServeActivity, ServeConfigure>)}
     * @memberof PackConfigure
     */
    serve?: ExpressionToken<Src> | ConfigureType<ServeActivity, ServeConfigure>;

}
