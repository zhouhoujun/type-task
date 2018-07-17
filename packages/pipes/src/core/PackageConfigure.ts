import { CtxType, Src, ExpressionToken, IActivityBuilder, SequenceConfigure, ConfigureType, IActivity } from '@taskfr/core';
import { ObjectMap, Registration } from '@ts-ioc/core';
import { TestActivity, TestConfigure } from './TestActivity';
import { AssetActivity } from './AssetActivity';
import { CleanActivity, CleanConfigure } from './CleanActivity';
import { DestActivity, DestConfigure } from './DestActivity';
import { IPipeActivity } from './IPipeActivity';
import { AssetConfigure } from './AssetConfigure';

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

export interface IPackageActivity extends IActivity {

}

export class InjectPackageToken<T extends IPackageActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PackageActivity', desc);
    }
}

export class InjectPackageBuilderToken<T extends IActivityBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('PackageActivityBuilder', desc);
    }
}

export const PackageToken = new InjectPackageToken<IPackageActivity>('');
export const PackageBuilderToken = new InjectPackageBuilderToken<IActivityBuilder>('')
