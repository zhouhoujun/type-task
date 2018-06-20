import { ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskp/core';
import { Inject, ContainerToken, IContainer, Singleton, lang } from '@ts-ioc/core';
import { IPipeConfigure, IPipeComponent } from '../core/index';
import { IAssetConfigure } from './IAssetConfigure';
import { DestTaskBuilder } from './DestTaskBuilder';
import { AssetPipe } from './AssetPipe';

/**
 * Asset task builder
 *
 * @export
 * @class AssetTaskBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(TaskBuilderToken, 'Asset')
export class AssetTaskBuilder extends DestTaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: IPipeComponent, config: IConfigure): Promise<ITask> {
        await super.beforeBindConfig(taskInst, config);
        let assetCfg = config as IAssetConfigure;
        let subs: IConfigure[] = [];

        if (assetCfg.src && !(taskInst instanceof AssetPipe)) {
            let srcCfg: IPipeConfigure = lang.assign({}, assetCfg);
            srcCfg.task = AssetPipe;
            assetCfg.pipes = [];
            taskInst.pipes = [];
            subs.push(srcCfg);
        }

        if (subs.length) {
            await this.buildChildren(taskInst as ITaskComponent, subs);
        }
        return taskInst;
    }
}
