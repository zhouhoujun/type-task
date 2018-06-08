import { AssetTask } from '../../decorators/index';
import { PipeElement, ITransform } from '../../core/index';
import { isBoolean } from '@ts-ioc/core';
import * as uglify from 'gulp-uglify';
import * as sourcemaps from 'gulp-sourcemaps';

@AssetTask({
    name: 'tscompile',
    dest: [
        {
            pipes: [
                (ctx, config, transform) => {
                    let trans: ITransform = transform.js;
                    trans.changeAsOrigin = true;
                    return trans;
                },
                (ctx, config) => {
                    if (config.uglify) {
                        return isBoolean(config.uglify) ? uglify() : uglify(config.uglify);
                    }
                    return null;
                },
                (ctx) => sourcemaps.write('./sourcemaps')
            ]
        },
        {
            pipes: [
                (ctx, config, transform) => {
                    let tans: ITransform = transform.dts;
                    tans.changeAsOrigin = true;
                    return tans;
                }
            ]
        }
    ]
})
export class TsCompile extends PipeElement {

}
