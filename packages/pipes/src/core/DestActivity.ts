import { dest, DestOptions } from 'vinyl-fs';
import { PipeTask } from '../decorators';
import { ITransform } from './ITransform';
import { Expression, IActivity, ExpressionType } from '@taskfr/core';
import { InjectPipeActivityToken } from './IPipeActivity';
import { IPipeConfigure } from './IPipeConfigure';
import { PipeActivity } from './PipeActivity';
/**
 * dest activity token.
 */
export const DestAcitvityToken = new InjectPipeActivityToken<DestActivity>('dest');

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
@PipeTask(DestAcitvityToken)
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

    async onActivityInit(config: DestConfigure) {
        await super.onActivityInit(config);
        this.dest = await this.toExpression(config.dest);

        if (config.destOptions) {
            this.destOptions = await this.toExpression(config.destOptions);
        }
    }

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
