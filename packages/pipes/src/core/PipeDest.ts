import { dest, DestOptions } from 'vinyl-fs';
import { PipeTask } from '../decorators';
import { ITransform } from './ITransform';
import { TransformType } from './pipeTypes';
import { Expression, IActivity, ExpressionType, isActivityType } from '@taskfr/core';
import { Registration, Singleton } from '@ts-ioc/core';
import { PipeActivityToken, IPipeActivity } from './IPipeActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeActivity } from './PipeActivity';
import { InjectPipeAcitityBuilderToken, PipeActivityBuilder } from './PipeActivityBuilder';
/**
 * dest task token.
 */
export const DestToken = new Registration<IPipeActivity>(PipeActivityToken, 'dest');

export const DestAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<PipeDestActivityBuilder>('dest')

/**
 * dest pipe configure.
 *
 * @export
 * @interface IPipeDestConfigure
 * @extends {IPipeConfigure}
 */
export interface DestConfigure extends IPipeConfigure {

    /**
     * pipe dest.
     *
     * @type {ExpressionType<string>}
     * @memberof IPipeConfigure
     */
    dest?: ExpressionType<string>;

    /**
     * dest options.
     *
     * @type {ExpressionType<DestOptions>}
     * @memberof IPipeConfigure
     */
    destOptions?: ExpressionType<DestOptions>;

}

/**
 * pipe dest activity.
 *
 * @export
 * @class PipeDestActivity
 * @extends {PipeComponent<IPipeDest>}
 * @implements {IPipeDest}
 * @implements {OnTaskInit}
 */
@PipeTask(DestToken, DestAcitvityBuilderToken)
export class PipeDestActivity extends PipeActivity {

    /**
     * source
     *
     * @type {Expression<string>}
     * @memberof IPipeDest
     */
    dest: Expression<string>;

    /**
     * source options.
     *
     * @type {Expression<DestOptions>}
     * @memberof PipeDest
     */
    destOptions: Expression<DestOptions>;

    protected pipe(source: ITransform, ...pipes: TransformType[]): Promise<ITransform> {
        return super.pipe(source, ...pipes)
            .then(stream => {
                return this.writeStream(stream)
            })
            .then(() => {
                return source;
            });
    }

    protected async writeStream(stream: ITransform): Promise<ITransform> {
        let dist = await this.context.exec(this, this.dest, stream);
        let destOptions = undefined;
        if (this.destOptions) {
            destOptions = await this.context.exec(this, this.destOptions, stream);
        }
        let output = stream.pipe(dest(this.context.toRootPath(dist), destOptions));
        if (!output) {
            return null;
        }

        return await new Promise((resolve, reject) => {
            output
                .once('end', () => {
                    resolve();
                })
                .once('error', reject);

        }).then(() => {
            output.removeAllListeners('error');
            output.removeAllListeners('end');
            return stream;
        }, err => {
            output.removeAllListeners('error');
            output.removeAllListeners('end');
            process.exit(1);
            return err;
        });
    }
}



@Singleton(DestAcitvityBuilderToken)
export class PipeDestActivityBuilder extends PipeActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: DestConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof PipeDestActivity) {

            if (isActivityType(config.dest)) {
                activity.dest = await this.build(config.dest, activity.id);
            } else {
                activity.dest = config.dest;
            }

            if (config.destOptions) {
                if (isActivityType(config.destOptions)) {
                    activity.destOptions = await this.build(config.destOptions, activity.id);
                } else {
                    activity.destOptions = config.destOptions;
                }
            }
        }
        return activity;
    }
}
