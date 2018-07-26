import { dest, DestOptions } from 'vinyl-fs';
import { PipeTask } from '../decorators';
import { ITransform } from './ITransform';
import { Expression, IActivity, ExpressionType } from '@taskfr/core';
import { Injectable } from '@ts-ioc/core';
import { InjectPipeActivityToken, InjectPipeAcitityBuilderToken } from './IPipeActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeActivity } from './PipeActivity';
import { PipeActivityBuilder } from './PipeActivityBuilder';
/**
 * dest activity token.
 */
export const DestAcitvityToken = new InjectPipeActivityToken<DestActivity>('dest');
/**
 * dest activity build token.
 */
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

    protected async afterPipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        stream = await super.afterPipe(stream, execute);
        await this.writeStream(stream);
        return stream;
    }

    /**
     * write dest stream.
     *
     * @protected
     * @param {ITransform} stream
     * @returns {Promise<ITransform>}
     * @memberof DestActivity
     */
    protected async writeStream(stream: ITransform): Promise<ITransform> {
        let dist = await this.context.exec(this, this.dest, stream);
        let destOptions = undefined;
        if (this.destOptions) {
            destOptions = await this.context.exec(this, this.destOptions, stream);
        }
        dist = this.context.toRootPath(dist);
        await this.executePipe(stream, dest(dist, destOptions), true);
        return stream;
    }
}

/**
 * dest activity builder.
 *
 * @export
 * @class DestActivityBuilder
 * @extends {PipeActivityBuilder}
 */
@Injectable(DestAcitvityBuilderToken)
export class DestActivityBuilder extends PipeActivityBuilder {

    createBuilder() {
        return this.container.get(DestAcitvityBuilderToken);
    }

    /**
     * dest activity build strategy.
     *
     * @param {IActivity} activity
     * @param {DestConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof DestActivityBuilder
     */
    async buildStrategy(activity: IActivity, config: DestConfigure): Promise<IActivity> {
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
