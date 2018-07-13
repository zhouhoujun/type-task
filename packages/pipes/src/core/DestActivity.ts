import { dest, DestOptions } from 'vinyl-fs';
import { PipeTask } from '../decorators';
import { ITransform } from './ITransform';
import { TransformType } from './pipeTypes';
import { Expression, IActivity, ExpressionType } from '@taskfr/core';
import { Singleton, isArray } from '@ts-ioc/core';
import { InjectPipeActivityToken } from './IPipeActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeActivity } from './PipeActivity';
import { InjectPipeAcitityBuilderToken, PipeActivityBuilder } from './PipeActivityBuilder';
import { SourceMapsActivity } from './SourceMapsActivity';
/**
 * dest activity token.
 */
export const DestAcitvityToken = new InjectPipeActivityToken('dest');

export const DestAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<DestActivityBuilder>('dest')

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
@PipeTask(DestAcitvityToken, DestAcitvityBuilderToken)
export class DestActivity extends PipeActivity {

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

    protected getRunPipes(execute?: IActivity<any>) {
        let pipes = this.pipes;
        if (execute) {
            if (execute instanceof SourceMapsActivity) {
                pipes = pipes.concat([execute]);
            } else if (execute instanceof PipeActivity) {
                pipes = pipes.concat([execute]);
            }
        }
        return pipes;
    }

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
export class DestActivityBuilder extends PipeActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: DestConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof DestActivity) {

            activity.dest = await this.toExpression(config.dest, activity);

            if (config.destOptions) {
                activity.destOptions = await this.toExpression(config.destOptions, activity);
            }
        }
        return activity;
    }
}
