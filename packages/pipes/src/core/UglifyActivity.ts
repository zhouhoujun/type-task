
import * as uglify from 'gulp-uglify';
import { Task, Activity, OnActivityInit, IConfigure, CtxType, InjectAcitityToken } from '@taskfr/core';
import { ITransform } from './ITransform';

/**
 * uglify activity configure.
 *
 * @export
 * @interface UglifyConfigure
 * @extends {IConfigure}
 */
export interface UglifyConfigure extends IConfigure {
    uglifyOtions?: CtxType<any>;
}

export const UglifyToken = new InjectAcitityToken<UglifyActivity>('uglify');

@Task(UglifyToken)
export class UglifyActivity extends Activity<ITransform> implements OnActivityInit {

    uglifyOtions: any;

    activityInit(config: UglifyConfigure) {
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
