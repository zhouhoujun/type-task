import { Activity, Task, CtxType, IConfigure, OnTaskInit, InjectAcitityToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import * as sourcemaps from 'gulp-sourcemaps';


/**
 * source map configure
 *
 * @export
 * @interface SourceMapsConfigure
 * @extends {IConfigure}
 */
export interface SourceMapsConfigure extends IConfigure {
    sourcemaps?: CtxType<string>;
}

export const SourceMapsToken = new InjectAcitityToken<SourceMapsActivity>('sourcemaps');

@Task(SourceMapsToken)
export class SourceMapsActivity extends Activity<ITransform> implements OnTaskInit {
    sourcemaps: string;

    onTaskInit(config: SourceMapsConfigure) {
        this.sourcemaps = this.context.to(config.sourcemaps) || './sourcemaps';
    }

    private hasInit = false;
    run(data: ITransform) {
        if (this.hasInit) {
            return this.write(data);
        } else {
            return this.init(data);
        }
    }

    async init(data: ITransform) {
        this.hasInit = true;
        return data.pipe(sourcemaps.init());
    }

    async write(data: ITransform): Promise<ITransform> {
        return data.pipe(sourcemaps.write(this.sourcemaps));
    }
}
