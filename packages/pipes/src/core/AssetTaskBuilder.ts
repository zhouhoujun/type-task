import { IActivity, IConfigure } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, lang } from '@ts-ioc/core';
import { AssetConfigure } from './AssetConfigure';
import { InjectPipeAcitityBuilderToken, PipeActivityBuilder } from './PipeActivityBuilder';
import { AssetActivity } from './AssetActivity';

export const AssetTaskBuilderToken = new InjectPipeAcitityBuilderToken<AssetTaskBuilder>('asset')


/**
 * Asset task builder
 *
 * @export
 * @class AssetTaskBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(AssetTaskBuilderToken)
export class AssetTaskBuilder extends PipeActivityBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async buildStrategy<T>(activity: IActivity<T>, config: AssetConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        let subs: IConfigure[] = [];

        // // only not pipesource add sub source task
        // if (config.src && !(activity instanceof AssetActivity)) {
        //     let srcCfg: IPipeConfigure = lang.assign({}, config);
        //     srcCfg.task = SourceAcitvityToken;
        //     config.pipes = [];
        //     activity.pipes = [];
        //     subs.push(srcCfg);
        // }

        // if (subs.length) {
        //     await this.buildChildren(activity as ITaskComponent, subs);
        // }
        return activity;
    }
}
