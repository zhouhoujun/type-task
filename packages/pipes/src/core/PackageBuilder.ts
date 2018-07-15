import { IActivity, SequenceActivityBuilder, Src, InjectAcitityToken } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, isArray, isString, lang, Registration } from '@ts-ioc/core';
import { PackageConfigure } from './PackageConfigure';
import { IPipeActivity } from './IPipeActivity';
import { PackageActivity } from './PackageActivity';
import { WatchActivity } from './WatchActivity';
import { DestActivity } from './DestActivity';
import { TestActivity, TestConfigure } from './TestActivity';
import { CleanActivity, CleanConfigure } from './CleanActivity';
import { AssetActivity } from './AssetActivity';
import { AssetBuilderToken } from './AssetTaskBuilder';


export interface IPackageActivity extends IPipeActivity {

}

export class InjectPackageToken<T extends IPackageActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PackageActivity', desc);
    }
}

export class InjectPackageBuilderToken<T extends PackageBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('PackageActivityBuilder', desc);
    }
}

export const PackageToken = new InjectPackageToken<IPackageActivity>('');
export const PackageBuilderToken = new InjectPackageBuilderToken<PackageBuilder>('')

/**
 * Asset task builder
 *
 * @export
 * @class AssetsBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(PackageBuilderToken)
export class PackageBuilder extends SequenceActivityBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async buildStrategy<T>(activity: IActivity<T>, config: PackageConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);

        if (activity instanceof PackageActivity) {
            let srcRoot = activity.src = activity.context.to(config.src);
            let assets = await Promise.all(lang.keys(config.assets).map(name => {
                return this.toActivity<Src, AssetActivity>(config.assets[name], activity,
                    act => act instanceof AssetActivity,
                    src => {
                        if (isString(src) || isArray(src)) {
                            return { src: src };
                        } else {
                            return null;
                        }
                    },
                    assCfg => {
                        if (!assCfg) {
                            return null;
                        }
                        if (!assCfg.task) {
                            assCfg.task = new InjectAcitityToken(name);
                        } else if (isString(assCfg.task)) {
                            assCfg.builder = AssetBuilderToken;
                        }

                        if (srcRoot && !assCfg.src) {
                            assCfg.src = `${srcRoot}/**/*.${name}`;
                        }
                        return assCfg;
                    })
            }));
            activity.assets = assets.filter(a => a);

            if (config.clean) {
                activity.clean = await this.toActivity<Src, CleanActivity>(config.clean, activity,
                    act => act instanceof CleanActivity,
                    src => {
                        return <CleanConfigure>{ src: src, task: TestActivity };
                    }
                );
            }

            if (config.test) {
                activity.test = await this.toActivity<Src, TestActivity>(config.test, activity,
                    act => act instanceof TestActivity,
                    src => {
                        return <TestConfigure>{ src: src, task: TestActivity };
                    }
                );
            }

            if (config.dest) {
                activity.dest = await this.toActivity<string, DestActivity>(config.dest, activity,
                    act => act instanceof DestActivity,
                    dest => {
                        return { dest: dest, task: DestActivity };
                    });
            }

            if (config.watch) {
                activity.watch = await this.toActivity<Src, WatchActivity>(config.watch, activity,
                    act => act instanceof WatchActivity,
                    watch => {
                        return { watch: watch, task: WatchActivity };
                    });
            }
        }

        return activity;
    }
}
