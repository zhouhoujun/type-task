import { IActivity, SequenceActivityBuilder, Src } from '@taskfr/core';
import { Singleton, isArray, isString, lang } from '@ts-ioc/core';
import { PackageConfigure, PackageBuilderToken } from './PackageConfigure';
import { PackageActivity } from './PackageActivity';
import { DestActivity, DestConfigure } from './DestActivity';
import { TestActivity, TestConfigure } from './TestActivity';
import { CleanActivity, CleanConfigure } from './CleanActivity';
import { AssetActivity } from './AssetActivity';
import { InjectAssetActivityToken, AssetConfigure } from './AssetConfigure';


/**
 * Asset task builder
 *
 * @export
 * @class AssetsBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(PackageBuilderToken)
export class PackageBuilder extends SequenceActivityBuilder {
    /**
     * package build stragegy.
     *
     * @param {IActivity} activity
     * @param {PackageConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof PackageBuilder
     */
    async buildStrategy(activity: IActivity, config: PackageConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof PackageActivity) {
            let srcRoot = activity.src = activity.context.to(config.src);
            let assets = await Promise.all(lang.keys(config.assets).map(name => {
                return this.toActivity<Src, AssetActivity, AssetConfigure>(config.assets[name], activity,
                    act => act instanceof AssetActivity,
                    src => {
                        if (isString(src) || isArray(src)) {
                            return <AssetConfigure>{ src: src };
                        } else {
                            return null;
                        }
                    },
                    assCfg => {
                        if (!assCfg) {
                            return null;
                        }
                        if (!assCfg.task) {
                            assCfg.task = new InjectAssetActivityToken(name);
                        } else if (isString(assCfg.task)) {
                            assCfg.task = new InjectAssetActivityToken(assCfg.task);
                        }

                        if (srcRoot && !assCfg.src) {
                            assCfg.src = `${srcRoot}/**/*.${name}`;
                        }
                        return assCfg;
                    })
            }));
            activity.assets = assets.filter(a => a);

            if (config.clean) {
                activity.clean = await this.toActivity<Src, CleanActivity, CleanConfigure>(config.clean, activity,
                    act => act instanceof CleanActivity,
                    src => {
                        return <CleanConfigure>{ clean: src, task: CleanActivity };
                    }
                );
            }

            if (config.test) {
                activity.test = await this.toActivity<Src, TestActivity, TestConfigure>(config.test, activity,
                    act => act instanceof TestActivity,
                    src => {
                        if (!src) {
                            return null;
                        }
                        return <TestConfigure>{ src: src, task: TestActivity };
                    }
                );
            }

            if (config.dest) {
                activity.dest = await this.toActivity<string, DestActivity, DestConfigure>(config.dest, activity,
                    act => act instanceof DestActivity,
                    dest => {
                        return { dest: dest, task: DestActivity };
                    });
            }

            // if (config.watch) {
            //     activity.watch = await this.toActivity<Src, WatchActivity>(config.watch, activity,
            //         act => act instanceof WatchActivity,
            //         watch => {
            //             return { src: watch, task: WatchActivity };
            //         });
            // }
        }

        return activity;
    }
    /**
     * get default activity.
     *
     * @returns
     * @memberof PackageBuilder
     */
    getDefaultAcitvity() {
        return PackageActivity;
    }
}
