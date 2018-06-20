import { ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskp/core';
import { Singleton, isArray, isString, Inject, ContainerToken, IContainer } from '@ts-ioc/core';
import { PipeTaskBuilder, PipeDest, DestToken } from '../core/index';
import { IAssetConfigure } from './IAssetConfigure';

@Singleton(TaskBuilderToken, 'dest')
export class DestTaskBuilder extends PipeTaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async afterBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        await super.afterBindConfig(taskInst, config);
        if (config.dest && !(taskInst instanceof PipeDest)) {
            let assetCfg = config as IAssetConfigure;
            let destcfg = taskInst.context.to(assetCfg.dest);
            let destcfgs = isArray(destcfg) ? destcfg : [destcfg];

            let children = destcfgs.map(cfg => {
                if (isString(cfg)) {
                    return {
                        dest: cfg,
                        task: DestToken
                    };
                } else {
                    cfg.task = cfg.task || DestToken;
                    return cfg
                }
            });
            await this.buildChildren(taskInst as ITaskComponent, children);
        }
        return taskInst;
    }
}
