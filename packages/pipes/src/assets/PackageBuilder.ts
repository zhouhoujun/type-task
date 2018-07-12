import { IActivity, IConfigure } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, isArray, isString, lang, Registration, isBoolean, isToken } from '@ts-ioc/core';
import { PipeTestActivity, PipeClean, CleanConfigure, TestToken, CleanToken, InjectPipeAcitityBuilderToken } from '../core';
import { IPackageConfigure } from './IPackageConfigure';
import { DestTaskBuilder } from './DestTaskBuilder';
import { AssetToken } from './IAsset';
import { AssetConfigure } from '../core/AssetConfigure';

export const PipeAcitityBuilderToken = new InjectPipeAcitityBuilderToken<PackageBuilder>('package');

/**
 * Asset task builder
 *
 * @export
 * @class AssetsBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(PipeAcitityBuilderToken)
export class PackageBuilder extends DestTaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: IPipeComponent, config: IConfigure): Promise<IActivity> {
        await super.beforeBindConfig(taskInst, config);
        let packCfg = config as IPackageConfigure;
        let subs: IConfigure[] = [];

        if (packCfg.test && !(taskInst instanceof PipeTestActivity)) {
            let test = taskInst.context.to(packCfg.test);
            let testCfg;
            if (isBoolean(test)) {
                testCfg = {};
            } else if (isArray(test) || isString(test)) {
                testCfg = { test: test };
            } else if (isToken(test)) {
                testCfg = { task: test };
            } else {
                testCfg = test;
            }
            testCfg.task = testCfg.task || TestToken;
            subs.push(testCfg);
        }

        if (packCfg.clean && !(taskInst instanceof PipeClean)) {
            let val = packCfg.clean;
            let cleanCfg: CleanConfigure
            if (isArray(val) || isString(val)) {
                cleanCfg = { clean: val };
            } else if (isToken(val)) {
                cleanCfg = { task: val };
            } else {
                cleanCfg = val;
            }
            if (!cleanCfg.task) {
                cleanCfg.task = CleanToken;
            }
            subs.push(cleanCfg);
        }

        if (packCfg.assets) {
            let srcRoot = taskInst.context.to(packCfg.src);
            lang.forIn(packCfg.assets, (val, key: string) => {
                let assCfg: AssetConfigure;
                if (isArray(val) || isString(val)) {
                    assCfg = { src: val };
                } else if (isToken(val)) {
                    assCfg = { task: val };
                } else {
                    assCfg = val;
                }

                if (!assCfg.task) {
                    assCfg.task = new Registration(AssetToken, key);
                } else if (isString(assCfg.task)) {
                    assCfg.builder = AssetTaskBuilderToken;
                }

                if (srcRoot && !assCfg.src) {
                    assCfg.src = `${srcRoot}/**/*.${key}`;
                }
                subs.push(assCfg);
            });
        }

        if (subs.length) {
            await this.buildChildren(taskInst as ITaskComponent, subs);
        }
        return taskInst;
    }
}
