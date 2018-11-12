import { Src, ExpressionToken, ConfigureType, IActivity, InjectAcitityBuilderToken, GCoreActivityConfigs } from '@taskfr/core';
import { ObjectMap, Registration, Token } from '@ts-ioc/core';
import { BuildConfigure, TestConfigure, CleanConfigure, CleanActivity, TestActivity, BuildConfigures } from '@taskfr/build';
import { IPackActivity } from './IPackActivity';

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


/**
 * inject pack token.
 *
 * @export
 * @class InjectPackageToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectPackToken<T extends IPackActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PackActivity', desc);
    }
}

/**
 * pack token
 */
export const PackToken = new InjectPackToken<IPackActivity>('');

/**
 * pack builder token.
 */
export const PackBuilderToken = new InjectAcitityBuilderToken<IPackActivity>(PackToken);

