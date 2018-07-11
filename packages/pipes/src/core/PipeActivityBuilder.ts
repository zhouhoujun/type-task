import { ActivityBuilder, IActivity, IConfigure, IContext, InjectAcitityBuilderToken, IActivityBuilder } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, isClass, isMetadataObject, Token, Registration } from '@ts-ioc/core';
import { IPipeConfigure } from './IPipeConfigure';
import { TransformMergerExpress, TransMergerConfig, TransformConfig, TransformMerger, TransformType, TransformExpress } from './pipeTypes';
import { PipeActivityToken, IPipeActivity, InjectAssetActivityToken } from './IPipeActivity';
import { PipeActivity } from './PipeActivity';


/**
 * Inject PipeAcitityBuilder Token
 *
 * @export
 * @class InjectPipeAcitityBuilderToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectPipeAcitityBuilderToken<T extends IActivityBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('PipeActivityBuilder', desc);
    }
}

/**
 * pipe activity builder token.
 */
export const PipeActivityBuilderToken = new InjectPipeAcitityBuilderToken<PipeActivityBuilder>('')

/**
 * pipe task builder.
 *
 * @export
 * @class PipeTaskBuilder
 * @extends {ActivityBuilder}
 */
@Singleton(PipeActivityBuilderToken)
export class PipeActivityBuilder extends ActivityBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async buildStrategy<T>(activity: IActivity<T>, config: IPipeConfigure): Promise<IActivity<T>> {
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
        let taskToken: Token<IPipeActivity> = new InjectAssetActivityToken(token);
        if (this.container.has(taskToken)) {
            return taskToken;
        }

        taskToken = new Registration(PipeActivityToken, token);
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
