import { ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskp/core';
import { Inject, ContainerToken, IContainer, Singleton, isArray, isString } from '@ts-ioc/core';
import { PipeTaskBuilder, PipeSource, PipeDest, PipeTest, IPipeConfigure } from '../core/index';
import { IAssetConfigure } from './IAssetConfigure';

/**
 * Asset task builder
 *
 * @export
 * @class AssetTaskBuilder
 * @extends {PipeTaskBuilder}
 */
@Singleton(TaskBuilderToken, 'Asset')
export class AssetTaskBuilder extends PipeTaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        await super.beforeBindConfig(taskInst, config);
        let assetCfg = config as IAssetConfigure;
        let subs: IConfigure[] = [];
        if (assetCfg.src && !(taskInst instanceof PipeSource)) {
            let src = taskInst.context.to(assetCfg.src);
            let srcCfg: IPipeConfigure = isString(src) ? { src: src } : src;
            srcCfg.task = srcCfg.task || PipeSource;
            subs.push(srcCfg);
        }
        if (assetCfg.test && !(taskInst instanceof PipeTest)) {
            let test = taskInst.context.to(assetCfg.test);
            let testCfg: IPipeConfigure = isString(test) ? { src: test } : test;
            testCfg.task = testCfg.task || PipeTest;
            subs.push(testCfg);
        }

        if (subs.length) {
            await this.buildChildren(taskInst as ITaskComponent, subs);
        }
        return taskInst;
    }

    async afterBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        await super.afterBindConfig(taskInst, config);
        if (config.dest && !(taskInst instanceof PipeDest)) {
            let assetCfg = config as IAssetConfigure;
            let destcfg = taskInst.context.to(assetCfg.dest);
            let destcfgs = isArray(destcfg) ? destcfg : [destcfg];

            await Promise.all(destcfgs.map(cfg => {
                if (isString(cfg)) {
                    return this.buildChildren(taskInst as ITaskComponent, [{
                        dest: cfg,
                        task: PipeDest
                    }]);
                } else {
                    return this.buildChildren(taskInst as ITaskComponent, [{
                        dest: cfg.dest,
                        pipes: cfg.pipes,
                        destOptions: cfg.destOptions,
                        task: PipeDest
                    }]);
                }
            }));
        }
        return taskInst;
    }
}
