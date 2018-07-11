import { ActivityBuilder, IActivity, IConfigure, IContext } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, isClass, isMetadataObject, Token, Registration } from '@ts-ioc/core';
import { IPipeConfigure } from './IPipeConfigure';
import { TransformMergerExpress, TransMergerConfig, TransformConfig, TransformMerger, TransformType, TransformExpress } from './pipeTypes';
import { PipeToken, PipeTaskBuilderToken, IPipeActivity } from '../IPipeTask';
import { AssetToken } from '../assets/IAsset';
import { PipeActivity } from './PipeActivity';

/**
 * pipe task builder.
 *
 * @export
 * @class PipeTaskBuilder
 * @extends {ActivityBuilder}
 */
@Singleton(PipeTaskBuilderToken)
export class PipeTaskBuilder extends ActivityBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async buildStrategy(activity: IPipeActivity, config: IPipeConfigure): Promise<IPipeActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof PipeActivity) {
            if (config.pipes) {
                activity.pipes = await this.translatePipes(activity.context, config.pipes);
            }
            if (config.merger) {
                activity.merger = await this.translateMerger(activity.context, config.merger);
            }
        }
        return activity;
    }


    protected traslateStrToken(token: string): Token<IPipeActivity> {
        let taskToken: Token<IPipeActivity> = new Registration(AssetToken, token);
        if (this.container.has(taskToken)) {
            return taskToken;
        }

        taskToken = new Registration(PipeToken, token);
        if (this.container.has(taskToken)) {
            return taskToken;
        }
        return super.traslateStrToken(token);
    }

    protected translatePipes(context: IContext, pipes: TransformExpress): TransformType[] {
        let trsfs: TransformConfig[] = context.to(pipes);
        if (!trsfs || trsfs.length < 1) {
            return [];
        }
        return trsfs.map(p => {
            if (isClass(p) && context.isTask(p)) {
                return context.getRunner(p);
            }
            if (isMetadataObject(p)) {
                let cfg = p as IConfigure;
                if (cfg.task || cfg.bootstrap) {
                    return context.getRunner(cfg);
                } else {
                    throw new Error('pipe configure error');
                }
            }
            return p as TransformType;
        });
    }

    protected translateMerger(context: IContext, mergerExp: TransformMergerExpress): TransformMerger {
        let mt: TransMergerConfig = context.to(mergerExp);
        if (!mt) {
            return null;
        }
        let merger: TransformMerger;

        if (isClass(mt) && context.isTask(mt)) {
            merger = context.getRunner(mt);
        } else if (isMetadataObject(mt)) {
            let cfg = mt as IConfigure;
            if (cfg.task || cfg.bootstrap) {
                merger = context.getRunner(cfg);
            } else {
                throw new Error('pipe configure error');
            }
        } else {
            merger = mt as TransformMerger;
        }

        return merger;
    }

}
