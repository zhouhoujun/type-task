import { Src, ExpressionToken, ConfigureType, IActivity, GCoreActivityConfigs, CtxType } from '@taskfr/core';
import { ObjectMap, Token } from '@ts-ioc/core';
import { BuildConfigure, TestConfigure, CleanConfigure, CleanActivity, TestActivity, BuildConfigures } from '@taskfr/build';

/**
 * pack configure.
 */
export type PackConfigures = BuildConfigures | PackConfigure | GCoreActivityConfigs<BuildConfigures | PackConfigure>;

/**
 * pack activity type, configy.
 */
export type PackActivityType<T extends IActivity> = Token<T> | PackConfigures;

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
     * @type {ObjectMap<ExpressionToken<Src> | ConfigureType<IActivity, PackConfigures>>}
     * @memberof PackConfigure
     */
    assets?: ObjectMap<ExpressionToken<Src> | ConfigureType<IActivity, PackConfigures>>;

    /**
     * test config.
     *
     * @type {(ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>)}
     * @memberof PackConfigure
     */
    test?: ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>;

    /**
     * package sequence activity.
     *
     * @type {PackActivityType<IActivity>[]}
     * @memberof PackConfigure
     */
    sequence?: PackActivityType<IActivity>[];

}
