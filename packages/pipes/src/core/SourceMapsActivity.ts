import { Activity, Task, CtxType, ActivityConfigure, OnActivityInit, InjectAcitityToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import * as sourcemaps from 'gulp-sourcemaps';


/**
 * source map configure
 *
 * @export
 * @interface SourceMapsConfigure
 * @extends {ActivityConfigure}
 */
export interface SourceMapsConfigure extends ActivityConfigure {
    sourcemaps?: CtxType<string>;
}

export const SourceMapsToken = new InjectAcitityToken<SourceMapsActivity>('sourcemaps');

@Task(SourceMapsToken)
export class SourceMapsActivity extends Activity<ITransform> implements OnActivityInit {
    sourcemaps: string;

    async onActivityInit(config: SourceMapsConfigure) {
        await super.onActivityInit(config);
        this.sourcemaps = this.context.to(config.sourcemaps) || './sourcemaps';
    }

    private hasInit = false;
    async run(data: ITransform) {
        if (!this.hasInit) {
            return data.pipe(sourcemaps.init());
        } else {
            return data.pipe(sourcemaps.write(this.sourcemaps));
        }
    }

    async init(data: ITransform) {
        this.hasInit = false;
        let stream = await this.run(data);
        this.hasInit = true;
        return stream;
    }

    async write(data: ITransform): Promise<ITransform> {
        if (this.hasInit) {
            return data;
        }
        return this.run(data);
    }
}
