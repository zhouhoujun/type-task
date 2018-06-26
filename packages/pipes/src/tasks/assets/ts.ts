import { AssetTask } from '../../decorators/index';
import { IDestConfigure } from '../../core/index';
import { isBoolean, ObjectMap, isString, isArray } from '@ts-ioc/core';
import { OnTaskInit, CtxType } from '@taskfr/core';
import * as uglify from 'gulp-uglify';
import * as sourcemaps from 'gulp-sourcemaps';
import { IAssetConfigure, DestType, AssetPipe } from '../../assets/index';
import * as ts from 'gulp-typescript';
import { ITransform } from '../../ITransform';

/**
 * ts task configure.
 *
 * @export
 * @interface TsConfigure
 * @extends {IAssetConfigure}
 */
export interface TsConfigure extends IAssetConfigure {
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
export class TsCompile extends AssetPipe implements OnTaskInit {

    onTaskInit(cfg: TsConfigure) {
        super.onTaskInit(cfg);
        let pipes = this.context.to(cfg.pipes) || [];
        if (this.context.to(cfg.sourcemaps) !== false) {
            pipes.unshift(() => sourcemaps.init());
        }
        pipes.push(() => this.getTsCompilePipe(cfg));
        cfg.pipes = pipes;

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

    generateDest(cfg: TsConfigure, dest: DestType): IDestConfigure | IDestConfigure[] {
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
