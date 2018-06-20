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
        let packCfg = config as IPackageConfigure;
        let subs: IConfigure[] = [];

        if (packCfg.test && !(taskInst instanceof PipeTest)) {
            let test = taskInst.context.to(packCfg.test);
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

        if (packCfg.clean && !(taskInst instanceof PipeClean)) {
            let val = packCfg.clean;
            let assCfg: ICleanConfigure = (isArray(val) || isString(val)) ? { clean: val } : val;
            if (!assCfg.task) {
                assCfg.task = CleanToken;
            }
        }

        if (packCfg.assets) {
            let srcRoot = taskInst.context.to(packCfg.src);
            lang.forIn(packCfg.assets, (val, key: string) => {
                let assCfg = (isArray(val) || isString(val)) ? { src: val } : val;
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
