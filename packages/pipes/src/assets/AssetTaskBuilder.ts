import { ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskp/core';
import { Inject, ContainerToken, IContainer, Singleton, isArray, isString } from '@ts-ioc/core';
import { IPipeComponent, PipeTaskBuilder, PipeDest, PipeSource } from '../core/index';
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
        let comp = taskInst as IPipeComponent;
        let assetCfg = config as IAssetConfigure;
        if (config.src && !(taskInst instanceof PipeSource)) {
            await this.buildChildren(taskInst as ITaskComponent, [{
                src: assetCfg.src,
                pipes: assetCfg.pipes,
                srcOptions: assetCfg.srcOptions,
                task: PipeSource
            }]);
        }
        return taskInst;
    }

    async afterBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
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
