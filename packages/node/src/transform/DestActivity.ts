import { dest, DestOptions } from 'vinyl-fs';
import { Expression, ExpressionType, Task } from '@taskfr/core';
import { SourceMapsActivity } from './SourceMapsActivity';
import { TransformActivityContext, TransformActivityContextToken } from './TransformActivityContext';
import { TransformActivity } from './TransformActivity';
import { InjectTransformActivityToken } from './ITransformActivity';
import { ITransformConfigure } from './ITransformConfigure';
import { isTransform } from './transformTypes';


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
 * @class DestActivity
 * @extends {TransformActivity}
 * @implements {ITransformDest}
 * @implements {OnTaskInit}
 */
@Task(DestAcitvityToken)
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

    protected async afterPipe(): Promise<void> {
        await super.afterPipe();
        let ctx = this.getContext();
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
        let dist = await ctx.exec(this, this.dest);
        let destOptions = undefined;
        if (this.destOptions) {
            destOptions = await ctx.exec(this, this.destOptions);
        }
        dist = ctx.toRootPath(dist);
        ctx.result = await this.executePipe(ctx.result, dest(dist, destOptions), true);
    }
}
