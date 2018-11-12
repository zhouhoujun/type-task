import { CtxType, Src, ExpressionToken, ConfigureType, IActivity, InjectAcitityBuilderToken, GCoreActivityConfigs } from '@taskfr/core';
import { ObjectMap, Registration, Token } from '@ts-ioc/core';
import {
    DestConfigure, DestActivity, BuildConfigure,
    TestConfigure, CleanConfigure, CleanActivity,
    TestActivity, BuildConfigures
} from '@taskfr/build';


export type PackageConfigures = PackageConfigure | BuildConfigures | GCoreActivityConfigs<PackageConfigure | BuildConfigures>;

export type PackageActivityType<T extends IActivity> = Token<T> | PackageConfigures;

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
     * @type {ObjectMap<ExpressionToken<Src> | ConfigureType<IActivity, PackageConfigures>>}
     * @memberof PackageConfigure
     */
    assets?: ObjectMap<ExpressionToken<Src> | ConfigureType<IActivity, PackageConfigures>>;

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

    /**
     * package sequence activity.
     *
     * @type {PackageActivityType<IActivity>[]}
     * @memberof PackageConfigure
     */
    sequence?: PackageActivityType<IActivity>[];

}

/**
 * package activity.
 *
 * @export
 * @interface IPackageActivity
 * @extends {IActivity}
 */
export interface IPackageActivity extends IActivity {

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

