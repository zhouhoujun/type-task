import { IActivity, IConfigure, SequenceActivityBuilder } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, Registration } from '@ts-ioc/core';
import { AssetConfigure } from './AssetConfigure';
import { IAssetActivity, AssetActivity } from './AssetActivity';




export class InjectAssetActivityToken<T extends IAssetActivity> extends Registration<T> {
    constructor(desc: string) {
        super('AssetActivity', desc);
    }
}

export class InjectAssetActivityBuilderToken<T extends AssetTaskBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('AssetActivityBuilder', desc);
    }
}

export const AssetToken = new InjectAssetActivityToken<IAssetActivity>('');
export const AssetBuilderToken = new InjectAssetActivityBuilderToken<AssetTaskBuilder>('')



/**
 * Asset task builder
 *
 * @export
 * @class AssetTaskBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(AssetBuilderToken)
export class AssetTaskBuilder extends SequenceActivityBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async buildStrategy<T>(activity: IActivity<T>, config: AssetConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        let subs: IConfigure[] = [];

        if (activity instanceof AssetActivity) {
            activity.src = await this.build(config.src, activity.id);
        }

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
