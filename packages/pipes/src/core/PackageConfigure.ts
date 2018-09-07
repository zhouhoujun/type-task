import { CtxType, Src, ExpressionToken, ConfigureType, IActivity, InjectAcitityBuilderToken, ActivityConfigure, CoreActivityConfigure } from '@taskfr/core';
import { ObjectMap, Registration, Token } from '@ts-ioc/core';
import { TestActivity, TestConfigure } from './TestActivity';
import { AssetActivity } from './AssetActivity';
import { CleanActivity, CleanConfigure } from './CleanActivity';
import { DestActivity, DestConfigure } from './DestActivity';
import { AssetConfigure } from './AssetConfigure';
import { IPipeConfigure } from './IPipeConfigure';
import { TsConfigure } from '../assets';
import { SourceConfigure } from './SourceActivity';
import { UglifyConfigure } from './UglifyActivity';
import { WatchConfigure } from './WatchActivity';
import { AnnotationsConfigure } from './Annotation';

export type PipesConfigure = CoreActivityConfigure & (AssetConfigure | IPipeConfigure
    | TsConfigure | DestConfigure | SourceConfigure | TestConfigure | UglifyConfigure
    | WatchConfigure | AnnotationsConfigure | CleanConfigure | DestConfigure);

export type PipesActivityType<T extends IActivity> = Token<T> | PipesConfigure;

/**
 * package configure.
 *
 * @export
 * @interface PackageConfigure
 * @extends {SequenceConfigure}
 */
export interface PackageConfigure extends ActivityConfigure {
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
    assets?: ObjectMap<ExpressionToken<Src> | ConfigureType<AssetActivity, AssetConfigure>>;

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
     * @type {PipesActivityType<IActivity>[]}
     * @memberof PackageConfigure
     */
    sequence?: PipesActivityType<IActivity>[];

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

