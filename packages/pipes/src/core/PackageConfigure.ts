import { CtxType, Src, ExpressionType, ActivityType, IActivityBuilder, SequenceConfigure, ActivityResultType } from '@taskfr/core';
import { ObjectMap, Registration } from '@ts-ioc/core';
import { IPipeConfigure } from './IPipeConfigure';
import { TestActivity } from './TestActivity';
import { AssetActivity } from './AssetActivity';
import { CleanActivity } from './CleanActivity';
import { DestActivity } from './DestActivity';
import { WatchActivity } from './WatchActivity';
import { IPipeActivity } from './IPipeActivity';

export interface PackageConfigure extends SequenceConfigure {
    /**
     * src root path.
     *
     * @type {CtxType<string>}
     * @memberof PackageConfigure
     */
    src?: CtxType<string>;

    /**
     * watch activity.
     *
     * @type {(ExpressionType<Src> | ActivityType<WatchActivity>)}
     * @memberof PackageConfigure
     */
    watch?: ExpressionType<Src> | ActivityType<WatchActivity>;


    /**
     * clean task config.
     *
     * @type {(ExpressionType<Src> | ActivityType<CleanActivity>)}
     * @memberof PackageConfigure
     */
    clean?: ExpressionType<Src> | ActivityType<CleanActivity>;
    /**
     * assets.
     *
     * @type {ObjectMap<ExpressionType<Src> | ActivityType<AssetActivity>>}
     * @memberof PackageConfigure
     */
    assets: ObjectMap<ExpressionType<Src> | ActivityType<AssetActivity>>;

    /**
     * test config.
     *
     * @type {(ExpressionType<Src> | ActivityType<TestActivity>;)}
     * @memberof PackageConfigure
     */
    test?: ExpressionType<Src> | ActivityType<TestActivity>;

    /**
     * dest.
     *
     * @type {(ExpressionType<string> | ActivityType<DestActivity>)}
     * @memberof PackageConfigure
     */
    dest?: ExpressionType<string> | ActivityType<DestActivity>;

}


export interface IPackageActivity extends IPipeActivity {

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
