import { IActivity, IConfigure, SequenceActivityBuilder, Activity, Src, Expression, Task } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, Registration, isBoolean } from '@ts-ioc/core';
import { AssetConfigure } from './AssetConfigure';
import { IAssetActivity, AssetActivity } from './AssetActivity';
import { SourceActivity } from './SourceActivity';
import { DestActivity } from './DestActivity';
import { WatchActivity } from './WatchActivity';




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

        if (activity instanceof AssetActivity) {
            activity.src = await this.toActivity<Src, SourceActivity>(config.src, activity,
                act => act instanceof SourceActivity,
                src => {
                    return { src: src, task: SourceActivity };
                });

            if (config.dest) {
                activity.dest = await this.toActivity<string, DestActivity>(config.dest, activity,
                    act => act instanceof DestActivity,
                    dest => {
                        return { dest: dest, task: DestActivity };
                    });
            }

            if (config.watch) {
                activity.watch = await this.toActivity<Src | boolean, WatchActivity>(config.watch, activity,
                    act => act instanceof WatchActivity,
                    watch => {
                        if (isBoolean(watch)) {
                            if (watch) {
                                return { watch: activity.src, task: WatchActivity };
                            }
                            return null;
                        }
                        return { watch: watch, task: WatchActivity };
                    });
            }
        }

        return activity;
    }
}
