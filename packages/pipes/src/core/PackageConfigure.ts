import { CtxType, Src, ExpressionToken, IActivityBuilder, SequenceConfigure, ConfigureType, IActivity } from '@taskfr/core';
import { ObjectMap, Registration } from '@ts-ioc/core';
import { TestActivity, TestConfigure } from './TestActivity';
import { AssetActivity } from './AssetActivity';
import { CleanActivity, CleanConfigure } from './CleanActivity';
import { DestActivity, DestConfigure } from './DestActivity';
import { AssetConfigure } from './AssetConfigure';

/**
 * package configure.
 *
 * @export
 * @interface PackageConfigure
 * @extends {SequenceConfigure}
 */
export interface PackageConfigure extends SequenceConfigure {
    /**
     * src root path.
     *
     * @type {CtxType<string>}
     * @memberof PackageConfigure
     */
    src?: CtxType<string>;

    // /**
    //  * watch activity.
    //  *
    //  * @type {(ExpressionToken<Src> | ActivityType<WatchActivity>)}
    //  * @memberof PackageConfigure
    //  */
    // watch?: ExpressionToken<Src> | ActivityType<WatchActivity>;


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
     * @type {ObjectMap<ExpressionToken<Src> | ConfigureType<AssetActivity, AssetConfigure>>}
     * @memberof PackageConfigure
     */
    assets: ObjectMap<ExpressionToken<Src> | ConfigureType<AssetActivity, AssetConfigure>>;

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
 * inject package build token.
 *
 * @export
 * @class InjectPackageBuilderToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectPackageBuilderToken<T extends IActivityBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('PackageActivityBuilder', desc);
    }
}

/**
 * package token
 */
export const PackageToken = new InjectPackageToken<IPackageActivity>('');
/**
 * package builder token.
 */
export const PackageBuilderToken = new InjectPackageBuilderToken<IActivityBuilder>('')
