import { AssetTask } from '../../decorators/index';
import { ITransform, PipeElement, IDestConfigure } from '../../core/index';
import { isBoolean, OnInit, ObjectMap, isString } from '@ts-ioc/core';
import * as uglify from 'gulp-uglify';
import * as sourcemaps from 'gulp-sourcemaps';
import { IAssetConfigure, DestType } from '../../assets/index';
import { dest } from 'vinyl-fs';
import { isArray } from 'util';

export interface TsConfigure extends IAssetConfigure {
    uglify?: boolean | ObjectMap<any>;
    tds?: boolean | string;
    sourcempas?: boolean | string;
}

@AssetTask({
    name: 'tscompile'
})
export class TsCompile extends PipeElement implements OnInit {

    onInit() {
        let cfg = this.config as TsConfigure;
        if (this.context.to(cfg.sourcempas) !== false) {
            let pipes = this.context.to(cfg.pipes) || [];
            pipes.unshift(() => sourcemaps.init());
            cfg.pipes = pipes;
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
            pipes.unshift((ctx, config) => {
                if (config.uglify) {
                    return isBoolean(config.uglify) ? uglify() : uglify(config.uglify);
                }
                return null;
            });
        }
        if (cfg.sourcemaps) {
            let smaps = this.context.to(cfg.sourcempas);
            if (smaps !== false) {
                pipes.push((ctx) => sourcemaps.write(isString(smaps) ? smaps : './sourcemaps'))
            }
        }

        pipes.unshift((ctx, config, transform) => {
            let trans: ITransform = transform.js;
            trans.changeAsOrigin = true;
            return trans;
        });

        dest.pipes = pipes;
        if (!cfg.tds && cfg.tds !== false) {
            cfg.tds = destPath;
        }

        if (cfg.tds) {
            dest = [dest, {
                dest: cfg.tds,
                pipes: [
                    (ctx, config, transform) => {
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
