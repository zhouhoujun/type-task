import { IActivity, IConfigure, ITaskComponent } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, lang, isArray, isString, Token, Registration, isUndefined, isToken } from '@ts-ioc/core';
import { IPipeConfigure, IPipeComponent, PipeSource, SourceToken, PipeClean, ICleanConfigure, CleanToken } from '../core';
import { IAssetConfigure } from './IAssetConfigure';
import { DestTaskBuilder } from './DestTaskBuilder';
import { AssetToken } from './IAsset';
import { AssetTaskBuilderToken } from '../IPipeTask';

/**
 * Asset task builder
 *
 * @export
 * @class AssetTaskBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(AssetTaskBuilderToken)
export class AssetTaskBuilder extends DestTaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: IPipeComponent, config: IConfigure): Promise<IActivity> {
        await super.beforeBindConfig(taskInst, config);
        let assetCfg = config as IAssetConfigure;
        let subs: IConfigure[] = [];

        // only not pipesource add sub source task
        if (assetCfg.src && !(taskInst instanceof PipeSource)) {
            let srcCfg: IPipeConfigure = lang.assign({}, assetCfg);
            srcCfg.task = SourceToken;
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
