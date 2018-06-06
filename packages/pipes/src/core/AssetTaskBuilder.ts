import { TaskBuilder, ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskp/core';
import { Inject, ContainerToken, IContainer, Singleton, Token } from '@ts-ioc/core';
import { IPipeConfigure, ISourceConfigure, IDestConfigure, IAssetConfigure } from './IPipeConfigure';
import { PipeDest } from './PipeDest';
import { PipeSource } from './PipeSource';
import { IPipeComponent } from './IPipeComponent';
import { PipeTaskBuilder } from './PipeTaskBuilder';

@Singleton(TaskBuilderToken, 'Asset')
export class AssetTaskBuilder  extends PipeTaskBuilder {
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
            let assetCfg = config.dest as IAssetConfigure;
            await this.buildChildren(taskInst as ITaskComponent, [{
                dest: assetCfg.dest,
                pipes: assetCfg.pipes,
                destOptions: assetCfg.destOptions,
                task: PipeDest
            }]);
        }
        return taskInst;
    }
}
