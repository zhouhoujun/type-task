import { ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, isArray, isString, lang, Registration, isBoolean, isToken } from '@ts-ioc/core';
import { IPipeComponent, PipeTest, PipeClean, ICleanConfigure, TestToken, CleanToken } from '../core/index';
import { IPackageConfigure } from './IPackageConfigure';
import { DestTaskBuilder } from './DestTaskBuilder';
import { AssetToken } from './IAssetPipe';
import { IAssetConfigure } from './IAssetConfigure';

/**
 * Asset task builder
 *
 * @export
 * @class AssetsBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(TaskBuilderToken, 'package')
export class PackageBuilder extends DestTaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: IPipeComponent, config: IConfigure): Promise<ITask> {
        await super.beforeBindConfig(taskInst, config);
        let packCfg = config as IPackageConfigure;
        let subs: IConfigure[] = [];

        if (packCfg.test && !(taskInst instanceof PipeTest)) {
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
            let cleanCfg: ICleanConfigure
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
                let assCfg: IAssetConfigure;
                if (isArray(val) || isString(val)) {
                    assCfg = { src: val };
                } else if (isToken(val)) {
                    assCfg = { task: val };
                } else {
                    assCfg = val;
                }

                if (!assCfg.task) {
                    assCfg.task = new Registration(AssetToken, key);
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
