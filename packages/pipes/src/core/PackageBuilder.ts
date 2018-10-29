import { IActivity, Src, ActivityBuilder, SequenceActivity, SequenceConfigure, SequenceActivityToken, Activity, ParallelConfigure, ParallelActivityToken } from '@taskfr/core';
import { isArray, isString, lang, Injectable } from '@ts-ioc/core';
import { PackageConfigure, PackageBuilderToken, TransformsConfigure } from './PackageConfigure';
import { PackageActivity } from './PackageActivity';
import { CleanActivity, CleanConfigure, TestActivity, TestConfigure, DestActivity, DestConfigure, BuildHandleActivity, BuildHandleConfigure } from '@taskfr/node';
import { AssetActivity } from './AssetActivity';
import { AssetConfigure } from './AssetConfigure';
import { InjectAssetActivityToken, AssetToken } from './IAssetActivity';


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
                return this.toActivity<Src, BuildHandleActivity, TransformsConfigure>(config.assets[name], activity,
                    act => act instanceof Activity,
                    src => {
                        if (isString(src) || isArray(src)) {
                            return <BuildHandleConfigure>{ test: src };
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
                            return {
                                test: srcRoot ? `${srcRoot}/**/*.${name}` : () => true,
                                compiler: seqcfg
                            };
                        }

                        let parcfg = cfg as ParallelConfigure;
                        if (isArray(parcfg.parallel)) {
                            if (!parcfg.activity && !parcfg.task) {
                                parcfg.task = ParallelActivityToken;
                            }
                            return {
                                test: srcRoot ? `${srcRoot}/**/*.${name}` : () => true,
                                compiler: parcfg
                            }
                        }

                        let hBuildCfg = cfg as BuildHandleConfigure;
                        if (!hBuildCfg.activity && !hBuildCfg.task) {
                            hBuildCfg.task = 'build-handle'
                        }
                        if (!hBuildCfg.compiler) {
                            hBuildCfg.compiler = new InjectAssetActivityToken(name);
                            if (isString(hBuildCfg.compiler)) {
                                hBuildCfg.compiler = new InjectAssetActivityToken(hBuildCfg.compiler);
                            }
                            if (!this.container.has(hBuildCfg.compiler)) {
                                hBuildCfg.compiler = AssetToken;
                            }
                        }

                        if (srcRoot && !hBuildCfg.test) {
                            hBuildCfg.test = `${srcRoot}/**/*.${name}`;
                        }
                        return hBuildCfg;
                    })
            }));

            activity.use(...assets.filter(a => a));

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
