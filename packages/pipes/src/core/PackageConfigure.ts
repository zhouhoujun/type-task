import { CtxType, Src, ExpressionToken, ConfigureType, IActivity, InjectAcitityBuilderToken } from '@taskfr/core';
import { ObjectMap, Registration, Token } from '@ts-ioc/core';
import {
    DestConfigure, DestActivity, BuildConfigure,
    TestConfigure, CleanConfigure, CleanActivity,
    TestActivity, BuildConfigures, IBuildActivity
} from '@taskfr/build';

/**
 * package configure.
 */
export type PackageConfigures<T> = PackageConfigure | BuildConfigures<T>;

/**
 * package activity type, configy.
 */
export type PackageActivityType<T extends IActivity> = Token<T> | PackageConfigures<T>;

/**
 * package configure.
 *
 * @export
 * @interface PackageConfigure
 * @extends {BuildConfigure}
 */
export interface PackageConfigure extends BuildConfigure {
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
     * @memberof PackageConfigure
     */
    clean?: ExpressionToken<Src> | ConfigureType<CleanActivity, CleanConfigure>;
    /**
     * assets.
     *
     * @type {ObjectMap<ExpressionToken<Src> |  PackageConfigures<PackageActivityType<IActivity>>>}
     * @memberof PackageConfigure
     */
    assets?: ObjectMap<ExpressionToken<Src> | PackageConfigures<PackageActivityType<IActivity>>>;

    /**
     * test config.
     *
     * @type {(ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>)}
     * @memberof PackageConfigure
     */
    test?: ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>;

    /**
     * dest.
     *
     * @type {(ExpressionToken<string> | ConfigureType<DestActivity, DestConfigure>)}
     * @memberof PackageConfigure
     */
    dest?: ExpressionToken<string> | ConfigureType<DestActivity, DestConfigure>;

}

/**
 * package activity.
 *
 * @export
 * @interface IPackageActivity
 * @extends {IActivity}
 */
export interface IPackageActivity extends IBuildActivity {

}

/**
 * inject package token.
 *
 * @export
 * @class InjectPackageToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectPackageToken<T extends IPackageActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PackageActivity', desc);
    }
}

/**
 * package token
 */
export const PackageToken = new InjectPackageToken<IPackageActivity>('');

/**
 * package builder token.
 */
export const PackageBuilderToken = new InjectAcitityBuilderToken<IPackageActivity>(PackageToken);

