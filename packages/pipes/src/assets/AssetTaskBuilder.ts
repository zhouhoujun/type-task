import { ITask, IConfigure, ITaskComponent } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, lang, isArray, isString, Token, Registration, isUndefined } from '@ts-ioc/core';
import { IPipeConfigure, IPipeComponent, PipeSource, SourceToken, PipeClean, ICleanConfigure, CleanToken } from '../core/index';
import { IAssetConfigure } from './IAssetConfigure';
import { DestTaskBuilder } from './DestTaskBuilder';
import { AssetToken } from './IAssetPipe';
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

    async beforeBindConfig(taskInst: IPipeComponent, config: IConfigure): Promise<ITask> {
        await super.beforeBindConfig(taskInst, config);
        let assetCfg = config as IAssetConfigure;
        let subs: IConfigure[] = [];

        if (isUndefined(assetCfg.awaitPiped)) {
            assetCfg.awaitPiped = true;
        }

        if (assetCfg.clean && !(taskInst instanceof PipeClean)) {
            let val = assetCfg.clean;
            let cleanCfg: ICleanConfigure = (isArray(val) || isString(val)) ? { clean: val } : val;
            if (!cleanCfg.task) {
                cleanCfg.task = CleanToken;
            }
            subs.push(cleanCfg);
        }

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

    // protected traslateStrToken(token: string): Token<ITask> {
    //     let taskToken = new Registration(AssetToken, token);
    //     if (this.container.has(taskToken)) {
    //         return taskToken;
    //     }
    //     return super.traslateStrToken(token);
    // }
}
