
import * as uglify from 'gulp-uglify';
import { Task, Activity, OnActivityInit, ActivityConfigure, CtxType, InjectAcitityToken } from '@taskfr/core';
import { ITransform, TransformActivityContext } from '@taskfr/node';

/**
 * uglify activity configure.
 *
 * @export
 * @interface UglifyConfigure
 * @extends {ActivityConfigure}
 */
export interface UglifyConfigure extends ActivityConfigure {
    /**
     * uglify options.
     *
     * @type {CtxType<any>}
     * @memberof UglifyConfigure
     */
    uglifyOptions?: CtxType<any>;
}

/**
 *  uglify token.
 */
export const UglifyToken = new InjectAcitityToken<UglifyActivity>('uglify');


/**
 * uglify activity.
 *
 * @export
 * @class UglifyActivity
 * @extends {Activity<ITransform>}
 * @implements {OnActivityInit}
 */
@Task(UglifyToken)
export class UglifyActivity extends Activity<ITransform> implements OnActivityInit {

    /**
     * uglify options
     *
     * @type {*}
     * @memberof UglifyActivity
     */
    uglifyOptions: any;

    async onActivityInit(config: UglifyConfigure) {
        await super.onActivityInit(config);
        this.uglifyOptions = this.context.to(config.uglifyOptions);
    }

    protected async execute(ctx: TransformActivityContext) {
        if (this.uglifyOptions) {
            ctx.data = ctx.data.pipe(uglify(this.uglifyOptions))
        } else {
            ctx.data = ctx.data.pipe(uglify())
        }
    }
}
