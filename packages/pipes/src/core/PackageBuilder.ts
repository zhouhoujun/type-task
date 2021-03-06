import { IActivity, Src, ActivityBuilder, SequenceActivity, SequenceConfigure, SequenceActivityToken, Activity, ParallelConfigure, ParallelActivityToken } from '@taskfr/core';
import { isArray, isString, lang, Injectable } from '@ts-ioc/core';
import { PackageConfigure, PackageBuilderToken, PipesConfigure } from './PackageConfigure';
import { PackageActivity } from './PackageActivity';
import { DestActivity, DestConfigure } from './DestActivity';
import { TestActivity, TestConfigure } from './TestActivity';
import { CleanActivity, CleanConfigure } from './CleanActivity';
import { AssetActivity } from './AssetActivity';
import { InjectAssetActivityToken, AssetConfigure, AssetToken } from './AssetConfigure';


/**
 * Asset task builder
 *
 * @export
 * @class AssetsBuilder
 * @extends {DestTaskBuilder}
 */
@Injectable(PackageBuilderToken)
export class PackageBuilder extends ActivityBuilder {

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
                return this.toActivity<Src, AssetActivity | SequenceActivity, PipesConfigure>(config.assets[name], activity,
                    act => act instanceof Activity,
                    src => {
                        if (isString(src) || isArray(src)) {
                            return <AssetConfigure>{ src: src };
                        } else {
                            return null;
                        }
                    },
                    cfg => {
                        if (!cfg) {
                            return null;
                        }
                        let seqcfg = cfg as SequenceConfigure;
                        if (isArray(seqcfg.sequence)) {
                            if (!seqcfg.activity && !seqcfg.task) {
                                seqcfg.task = SequenceActivityToken;
                            }
                            return seqcfg;
                        }

                        let parcfg = cfg as ParallelConfigure;
                        if (isArray(parcfg.parallel)) {
                            if (!parcfg.activity && !parcfg.task) {
                                parcfg.task = ParallelActivityToken;
                            }
                            return parcfg;
                        }

                        let assCfg = cfg as AssetConfigure;
                        if (!assCfg.activity && !assCfg.task) {
                            assCfg.task = new InjectAssetActivityToken(name);
                        }

                        if (isString(assCfg.task)) {
                            assCfg.task = new InjectAssetActivityToken(assCfg.task);
                        }
                        if (!this.container.has(assCfg.task)) {
                            assCfg.task = AssetToken;
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
