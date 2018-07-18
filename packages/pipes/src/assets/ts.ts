import { AssetTask } from '../decorators';
import { AssetConfigure, AssetActivity, DestActivity, DestAcitvityToken } from '../core';
import { isBoolean, ObjectMap, isString, lang, isArray } from '@ts-ioc/core';
import { classAnnotations } from '@ts-ioc/annotations';
import * as ts from 'gulp-typescript';
import { ITransform } from '../core/ITransform';
import { CtxType, OnTaskInit, IActivity } from '@taskfr/core';
import { AnnotationActivity } from '../core/Annotation';

/**
 * ts task configure.
 *
 * @export
 * @interface TsConfigure
 * @extends {AssetConfigure}
 */
export interface TsConfigure extends AssetConfigure {
    /**
     * tds config.
     *
     * @type {(CtxType<boolean | string>)}
     * @memberof TsConfigure
     */
    tds?: CtxType<boolean | string>;

    /**
     * set tsconfig to compile.
     *
     * @type {(CtxType<string | ObjectMap<any>>)}
     * @memberof TsConfigure
     */
    tsconfig?: CtxType<string | ObjectMap<any>>;


}

@AssetTask('ts')
export class TsCompile extends AssetActivity implements OnTaskInit {

    tdsDest: DestActivity | boolean;

    onTaskInit(cfg: TsConfigure) {
        this.defaultAnnotation = { annotationFramework: () => classAnnotations(), task: AnnotationActivity };
        let tds = this.context.to(cfg.tds);
        if (tds) {
            if (isBoolean(tds)) {
                this.tdsDest = true;
            }
            if (isString(tds)) {
                this.tdsDest = this.context.getContainer().resolve(DestAcitvityToken);
                this.tdsDest.dest = tds;
            }
        }
    }

    protected async execute(stream: ITransform): Promise<ITransform> {
        stream.js = await this.pipe(stream.js, ...this.pipes);
        return stream;
     }

    protected async beginPipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        stream = await super.beginPipe(stream, execute);
        return await this.pipe(stream, this.getTsCompilePipe());
    }

    private getTsCompilePipe(): ITransform {
        let cfg = this.config as TsConfigure;
        let tsconfig = this.context.to(cfg.tsconfig || './tsconfig.json');
        if (isString(tsconfig)) {
            let tsProject = ts.createProject(this.context.toRootPath(tsconfig));
            return tsProject();
        } else {
            return ts(tsconfig);
        }
    }

    protected async executeUglify(stream: ITransform) {
        if (this.uglify) {
            stream.js = await this.uglify.run(stream.js);
        }
        return stream;
    }

    protected async executeDest(ds: DestActivity, stream: ITransform) {
        if (!ds) {
            return null;
        }
        if (this.tdsDest && stream.dts) {
            let tds: DestActivity;
            if (isBoolean(this.tdsDest)) {
                tds = isArray(this.dest) ? lang.first(this.dest) : this.dest;
            } else {
                tds = this.tdsDest;
            }
            await this.executeDest(tds, stream);
        }
        await ds.run(stream.js, this.sourcemaps);
        return stream;
    }
}
