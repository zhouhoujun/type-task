
import * as uglify from 'gulp-uglify';
import { Task, Activity, OnTaskInit, IConfigure, CtxType, InjectAcitityToken } from '@taskfr/core';
import { ITransform } from './ITransform';

export interface UglifyConfigure extends IConfigure {
    uglifyOtions?: CtxType<any>;
}

export const UglifyToken = new InjectAcitityToken<UglifyActivity>('uglify');

@Task(UglifyToken)
export class UglifyActivity extends Activity<ITransform> implements OnTaskInit {

    uglifyOtions: any;

    onTaskInit(config: UglifyConfigure) {
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
