import * as path from 'path';
import { ShellActivity, ShellActivityConfig } from '../ShellActivity';
import { Task, Src, CtxType } from '@taskfr/core';
import { lang, ObjectMap } from '@ts-ioc/core';

export interface UglifyActivityConfig extends ShellActivityConfig {
    /**
     * ts file source.
     *
     * @type {CtxType<Src>}
     * @memberof TscBuilderActivityConfig
     */
    src?: CtxType<Src>;

    /**
     * ts compile out dir.
     *
     * @type {CtxType<string>}
     * @memberof TscBuilderActivityConfig
     */
    dist?: CtxType<string>;

    /**
     * bundle name.
     *
     * @type {CtxType<string>}
     * @memberof UglifyActivityConfig
     */
    bundle?: CtxType<string>;

    /**
     * uglify options.
     *
     * @type {CtxType<ObjectMap<any>>}
     * @memberof UglifyActivityConfig
     */
    uglifyOptions?: CtxType<ObjectMap<any>>;
}


@Task('uglify')
export class UglifyActivity extends ShellActivity {

    /**
     * src
     *
     * @type {Src}
     * @memberof UglifyActivity
     */
    src: Src;
    /**
     * output dist.
     *
     * @type {string}
     * @memberof UglifyActivity
     */
    dist: string;
    /**
     * bundle file name.
     *
     * @type {string}
     * @memberof UglifyActivity
     */
    bundle: string;

    uglifyOptions: ObjectMap<any>;

    async onActivityInit(config: UglifyActivityConfig) {
        await super.onActivityInit(config);
        this.options = lang.assign({ silent: true }, this.options || {});
        this.src = await this.context.getFiles(this.context.to(config.src));
        this.dist = this.context.to(config.dist);
        this.uglifyOptions = this.context.to(config.uglifyOptions);
        this.bundle = this.context.to(config.bundle) || 'bundle.js';
    }


    protected formatShell(shell: string) {
        let outfile = path.join(this.dist, this.bundle)
        shell = path.normalize(this.context.getRootPath() + '/node_modules/.bin/uglifyjs') +
            ' ' + outfile + ' -o ' + outfile
        return super.formatShell(shell);
    }

    protected formatArgs(env: ObjectMap<any>): string[] {
        let args = lang.assign({
            compress: true,
            mangle: true,
            toplevel: true,
            verbose: true
        }, env || {}, this.uglifyOptions);
        return super.formatArgs(args);
    }
}
