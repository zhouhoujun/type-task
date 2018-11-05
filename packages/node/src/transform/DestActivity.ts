import { dest, DestOptions } from 'vinyl-fs';
import { Expression, ExpressionType, Task } from '@taskfr/core';
import { SourceMapsActivity } from './SourceMapsActivity';
import { TransformActivityContext, TransformActivityContextToken } from './TransformActivityContext';
import { TransformActivity } from './TransformActivity';
import { InjectTransformActivityToken } from './ITransformActivity';
import { ITransformConfigure } from './ITransformConfigure';


/**
 * dest activity token.
 */
export const DestAcitvityToken = new InjectTransformActivityToken<DestActivity>('dest');

/**
 * dest pipe configure.
 *
 * @export
 * @interface ITransformDestConfigure
 * @extends {ITransformConfigure}
 */
export interface DestConfigure extends ITransformConfigure {

    /**
     * pipe dest.
     *
     * @type {ExpressionType<string>}
     * @memberof ITransformConfigure
     */
    dest?: ExpressionType<string>;

    /**
     * dest options.
     *
     * @type {ExpressionType<DestOptions>}
     * @memberof ITransformConfigure
     */
    destOptions?: ExpressionType<DestOptions>;

}

/**
 * pipe dest activity.
 *
 * @export
 * @class TransformDestActivity
 * @extends {TransformComponent<ITransformDest>}
 * @implements {ITransformDest}
 * @implements {OnTaskInit}
 */
@Task(DestAcitvityToken, TransformActivityContextToken)
export class DestActivity extends TransformActivity {

    /**
     * source
     *
     * @type {Expression<string>}
     * @memberof ITransformDest
     */
    dest: Expression<string>;

    /**
     * source options.
     *
     * @type {Expression<DestOptions>}
     * @memberof TransformDest
     */
    destOptions: Expression<DestOptions>;

    async onActivityInit(config: DestConfigure) {
        await super.onActivityInit(config);
        this.dest = await this.toExpression(config.dest);

        if (config.destOptions) {
            this.destOptions = await this.toExpression(config.destOptions);
        }
    }

    protected async afterPipe(ctx: TransformActivityContext): Promise<void> {
        await super.afterPipe(ctx);
        if (ctx.sourceMaps instanceof SourceMapsActivity) {
            await ctx.sourceMaps.run(ctx);
        }
        await this.writeStream(ctx);
    }

    /**
     * write dest stream.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof DestActivity
     */
    protected async writeStream(ctx: TransformActivityContext): Promise<void> {
        let dist = await this.context.exec(this, this.dest, ctx);
        let destOptions = undefined;
        if (this.destOptions) {
            destOptions = await this.context.exec(this, this.destOptions, ctx);
        }
        dist = this.context.toRootPath(dist);
        await this.executePipe(ctx.result, ctx, dest(dist, destOptions), true);
    }
}
