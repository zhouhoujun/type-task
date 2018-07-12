import { ActivityBuilder, IActivity, IConfigure, IActivityBuilder, isActivityType, TaskRunner } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, isMetadataObject, Token, Registration, isToken, isPromise } from '@ts-ioc/core';
import { IPipeConfigure } from './IPipeConfigure';
import { TransformConfig, TransformType, TransformExpress } from './pipeTypes';
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
                activity.pipes = await this.translate(activity, config.pipes);
            }

            if (config.merger) {
                activity.merger = await this.translateConfig(activity, config.merger);
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

    protected translate(activity: PipeActivity, pipes: TransformExpress): Promise<TransformType[]> {
        let trsfs: TransformConfig[] = activity.context.to(pipes);
        if (!trsfs || trsfs.length < 1) {
            return Promise.resolve([]);
        }
        return Promise.all(trsfs.map(p => this.translateConfig(activity, p)));
    }

    protected async translateConfig(activity: PipeActivity, tsCfg: TransformConfig): Promise<TransformType> {
        if (isActivityType(tsCfg)) {
            return await this.build(tsCfg, activity.id);
        }

        if (isPromise(tsCfg)) {
            return await tsCfg;
        }

        if (isMetadataObject(tsCfg)) {
            throw new Error('transform configure error');
        }

        return tsCfg as TransformType;
    }

}
