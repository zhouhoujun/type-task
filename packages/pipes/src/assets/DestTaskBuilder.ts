import { IActivity, IConfigure, ActivityBuilderToken } from '@taskfr/core';
import { Singleton, isArray, isString, Inject, ContainerToken, IContainer } from '@ts-ioc/core';
import { PipeActivityBuilder, DestActivity, DestAcitvityToken } from '../core';
import { AssetConfigure } from '../core/AssetConfigure';

/**
 * dest task builder.
 */
@Singleton(ActivityBuilderToken, 'dest')
export class DestTaskBuilder extends PipeActivityBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async afterBindConfig(taskInst: IActivity, config: IConfigure): Promise<IActivity> {
        await super.afterBindConfig(taskInst, config);
        if (config.dest && !(taskInst instanceof DestActivity)) {
            let assetCfg = config as AssetConfigure;
            let destcfg = taskInst.context.to(assetCfg.dest);
            let destcfgs = isArray(destcfg) ? destcfg : [destcfg];

            let children = destcfgs.map(cfg => {
                if (isString(cfg)) {
                    return {
                        dest: cfg,
                        task: DestAcitvityToken
                    };
                } else {
                    cfg.task = cfg.task || DestAcitvityToken;
                    return cfg
                }
            });
            await this.buildChildren(taskInst as ITaskComponent, children);
        }
        return taskInst;
    }
}
