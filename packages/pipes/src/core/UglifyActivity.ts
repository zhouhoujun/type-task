
import * as uglify from 'gulp-uglify';
import { Task, Activity, OnActivityInit, ActivityConfigure, CtxType, InjectAcitityToken } from '@taskfr/core';
import { ITransform } from './ITransform';

/**
 * uglify activity configure.
 *
 * @export
 * @interface UglifyConfigure
 * @extends {ActivityConfigure}
 */
export interface UglifyConfigure extends ActivityConfigure {
    uglifyOtions?: CtxType<any>;
}

/**
 *  uglify token.
 */
export const UglifyToken = new InjectAcitityToken<UglifyActivity>('uglify');

@Task(UglifyToken)
export class UglifyActivity extends Activity<ITransform> implements OnActivityInit {

    uglifyOtions: any;

    async onActivityInit(config: UglifyConfigure) {
        await super.onActivityInit(config);
        this.uglifyOtions = this.context.to(config.uglifyOtions);
    }

    async run(data: ITransform) {
        if (this.uglifyOtions) {
            return data.pipe(uglify(this.uglifyOtions))
        } else {
            return data.pipe(uglify())
        }
    }
}
