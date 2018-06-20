import { ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskp/core';
import { Inject, ContainerToken, IContainer, Singleton, isArray, isString, lang, Registration, isBoolean } from '@ts-ioc/core';
import { IPipeComponent, PipeTest, PipeClean, ICleanConfigure, TestToken, CleanToken } from '../core/index';
import { IPackageConfigure } from './IPackageConfigure';
import { DestTaskBuilder } from './DestTaskBuilder';
import { AssetToken } from './IAssetPipe';

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
        let assetCfg = config as IPackageConfigure;
        let subs: IConfigure[] = [];

        if (assetCfg.test && !(taskInst instanceof PipeTest)) {
            let test = taskInst.context.to(assetCfg.test);
            let testCfg;
            if (isBoolean(test)) {
                testCfg = {};
            } else if (isString(test)) {
                testCfg = { test: test };
            } else {
                testCfg = test;
            }
            testCfg.task = testCfg.task || TestToken;
            subs.push(testCfg);
        }

        if (assetCfg.clean && !(taskInst instanceof PipeClean)) {
            let val = assetCfg.clean;
            let assCfg: ICleanConfigure = (isArray(val) || isString(val)) ? { clean: val } : val;
            if (!assCfg.task) {
                assCfg.task = CleanToken;
            }
        }

        if (assetCfg.assets) {
            lang.forIn(assetCfg.assets, (val, key: string) => {
                let assCfg = (isArray(val) || isString(val)) ? { src: val } : val;
                if (!assCfg.task) {
                    assCfg.task = new Registration(AssetToken, key);
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
