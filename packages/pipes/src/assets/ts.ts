import { AssetTask } from '../decorators';
import { DestConfigure, TransformType, AssetConfigure, AssetActivity } from '../core';
import { isBoolean, ObjectMap, isString, isArray } from '@ts-ioc/core';
import { classAnnotations } from '@ts-ioc/annotations';
import * as uglify from 'gulp-uglify';
import * as sourcemaps from 'gulp-sourcemaps';
import * as ts from 'gulp-typescript';
import { ITransform } from '../core/ITransform';
import { CtxType, OnTaskInit } from '@taskfr/core';

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
     * class annotation.
     *
     * @type {(CtxType<boolean | TransformType>)}
     * @memberof TsConfigure
     */
    annotation?: CtxType<boolean | TransformType>;
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

    annotationFramework: TransformType;

    protected async anntation(data: ITransform): Promise<ITransform> {
        if (this.annotationFramework) {
            let next = await this.context.exec(this, this.annotationFramework, data);
            return data.pipe(next);
        }
        return data;
    }

    onTaskInit(cfg: TsConfigure) {

        let pipes = this.context.to(cfg.pipes) || [];
        let annotation = this.context.to(cfg.annotation);
        if (annotation) {
            if (isBoolean(annotation)) {
                this.annotationFramework = () => classAnnotations();
            } else {
                this.annotationFramework = annotation;
            }
        }

        if (cfg.dest) {
            let dest = this.context.to(cfg.dest);
            if (isArray(dest)) {
                let dests = [];
                dest.forEach(d => {
                    let subs = this.generateDest(cfg, d);
                    if (isArray(subs)) {
                        dests = dests.concat(subs);
                    } else {
                        dests.push(subs);
                    }
                });
                dest = dests;
            } else {
                dest = this.generateDest(cfg, dest);
            }
            cfg.dest = dest;
        }
    }

    private getTsCompilePipe(cfg: TsConfigure): ITransform {
        let tsconfig = this.context.to(cfg.tsconfig || './tsconfig.json');
        if (isString(tsconfig)) {
            let tsProject = ts.createProject(this.context.toRootPath(tsconfig));
            return tsProject();
        } else {
            return ts(tsconfig);
        }
    }

    generateDest(cfg: TsConfigure, dest: DestType): DestConfigure | DestConfigure[] {
        let destPath: string;
        if (isString(dest)) {
            destPath = dest;
            dest = { dest: dest };
        } else {
            destPath = this.context.to(dest.dest);
        }
        let pipes = this.context.to(dest.pipes) || [];

        if (cfg.uglify) {
            let uglifyCfg = this.context.to(cfg.uglify)
            pipes.unshift((ctx) => {
                if (uglifyCfg) {
                    return isBoolean(uglifyCfg) ? uglify() : uglify(uglifyCfg);
                }
                return null;
            });
        }

        let smaps = this.context.to(cfg.sourcemaps);
        if (smaps !== false) {
            pipes.push((ctx) => sourcemaps.write(isString(smaps) ? smaps : './sourcemaps'))
        }


        pipes.unshift((ctx, task, transform) => {
            let trans: ITransform = transform.js;
            trans.changeAsOrigin = true;
            return trans;
        });

        dest.pipes = pipes;
        let tds = this.context.to(cfg.tds)
        if (tds !== false) {
            cfg.tds = destPath;
        }

        if (cfg.tds) {
            dest.name = 'dest-js';
            dest = [dest, {
                name: 'dest-tds',
                dest: cfg.tds,
                pipes: [
                    (ctx, task, transform) => {
                        let tans: ITransform = transform.dts;
                        tans.changeAsOrigin = true;
                        return tans;
                    }
                ]
            }];
        }

        return dest;
    }

}
