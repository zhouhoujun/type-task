import { CtxType, Src, ExpressionToken, ConfigureType, IActivity, InjectAcitityBuilderToken, ActivityConfigure, CoreActivityConfigs, SequenceActivity, SequenceConfigure, ISequenceConfigure, Activity, GCoreActivityConfigs } from '@taskfr/core';
import { ObjectMap, Registration, Token } from '@ts-ioc/core';
import { AssetConfigure } from './AssetConfigure';
import { TsConfigure } from '../assets';
import { UglifyConfigure } from './UglifyActivity';
import { WatchConfigure, DestConfigure, SourceConfigure, ITransformConfigure, DestActivity } from '@taskfr/node';
import { AnnotationsConfigure } from './Annotation';
import { ShellActivityConfig, ExecFileActivityConfig, CleanActivity, CleanConfigure, TestActivity, TestConfigure } from '@taskfr/node';

type configures = CoreActivityConfigs | AssetConfigure | ITransformConfigure
    | TsConfigure | DestConfigure | SourceConfigure | TestConfigure | UglifyConfigure
    | WatchConfigure | AnnotationsConfigure | CleanConfigure | ShellActivityConfig | ExecFileActivityConfig | PackageConfigure;


export type TransformsConfigure = configures | GCoreActivityConfigs<configures>;

export type TransformsActivityType<T extends IActivity> = Token<T> | TransformsConfigure;

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
     * @type {ObjectMap<ExpressionToken<Src> | ConfigureType<IActivity, TransformsConfigure>>}
     * @memberof PackageConfigure
     */
    assets?: ObjectMap<ExpressionToken<Src> | ConfigureType<IActivity, TransformsConfigure>>;

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
     * @type {TransformsActivityType<IActivity>[]}
     * @memberof PackageConfigure
     */
    sequence?: TransformsActivityType<IActivity>[];

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

